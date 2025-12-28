import { NextRequest, NextResponse } from 'next/server';
import { query, initializeDatabase } from '@/lib/db';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';

export interface Photo {
  id: number;
  title: string;
  location: string;
  description: string;
  cloudinary_url: string;
  cloudinary_public_id: string;
  size: 'normal' | 'tall' | 'wide';
  width: number;
  height: number;
  created_at: string;
  updated_at: string;
}

// GET - Fetch all photos
export async function GET() {
  try {
    // Initialize database tables if not exist
    await initializeDatabase();
    
    const result = await query(
      'SELECT * FROM photos ORDER BY created_at DESC'
    );
    
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching photos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch photos' },
      { status: 500 }
    );
  }
}

// Helper to calculate size based on aspect ratio (Pinterest-style)
function calculateSize(width: number, height: number): 'normal' | 'tall' | 'wide' {
  const aspectRatio = width / height;
  
  if (aspectRatio < 0.8) {
    // Portrait/tall images (height > width significantly)
    return 'tall';
  } else if (aspectRatio > 1.4) {
    // Landscape/wide images (width > height significantly)
    return 'wide';
  }
  // Square-ish images
  return 'normal';
}

// POST - Add new photo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, location, description, image, cloudinary_url, cloudinary_public_id, width, height } = body;
    
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }
    
    let finalUrl = cloudinary_url;
    let finalPublicId = cloudinary_public_id;
    let finalWidth = width;
    let finalHeight = height;
    
    // If image base64 is provided (legacy), upload to Cloudinary
    if (image && !cloudinary_url) {
      const uploadResult = await uploadToCloudinary(image, 'photography');
      finalUrl = uploadResult.secure_url;
      finalPublicId = uploadResult.public_id;
      finalWidth = uploadResult.width;
      finalHeight = uploadResult.height;
    }
    
    if (!finalUrl) {
      return NextResponse.json(
        { error: 'Image is required' },
        { status: 400 }
      );
    }
    
    // Auto-calculate size based on aspect ratio
    const autoSize = calculateSize(finalWidth, finalHeight);
    
    // Insert into database
    const result = await query(
      `INSERT INTO photos (title, location, description, cloudinary_url, cloudinary_public_id, size, width, height)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        title,
        location || '',
        description || '',
        finalUrl,
        finalPublicId,
        autoSize,
        finalWidth,
        finalHeight,
      ]
    );
    
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error adding photo:', error);
    return NextResponse.json(
      { error: 'Failed to add photo' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a photo (by id in query params)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Photo ID is required' },
        { status: 400 }
      );
    }
    
    // Get photo details first to delete from Cloudinary
    const photoResult = await query(
      'SELECT cloudinary_public_id FROM photos WHERE id = $1',
      [id]
    );
    
    if (photoResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Photo not found' },
        { status: 404 }
      );
    }
    
    // Delete from Cloudinary
    await deleteFromCloudinary(photoResult.rows[0].cloudinary_public_id);
    
    // Delete from database
    await query('DELETE FROM photos WHERE id = $1', [id]);
    
    return NextResponse.json({ message: 'Photo deleted successfully' });
  } catch (error) {
    console.error('Error deleting photo:', error);
    return NextResponse.json(
      { error: 'Failed to delete photo' },
      { status: 500 }
    );
  }
}

// PUT - Update photo details
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, location, description, size } = body;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Photo ID is required' },
        { status: 400 }
      );
    }
    
    const result = await query(
      `UPDATE photos 
       SET title = COALESCE($1, title),
           location = COALESCE($2, location),
           description = COALESCE($3, description),
           size = COALESCE($4, size),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $5
       RETURNING *`,
      [title, location, description, size, id]
    );
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Photo not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating photo:', error);
    return NextResponse.json(
      { error: 'Failed to update photo' },
      { status: 500 }
    );
  }
}
