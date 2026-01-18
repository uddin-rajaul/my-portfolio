import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { slug, title, description, content, tags, read_time } = body;

    const result = await query(
        `UPDATE blogs 
         SET slug = $1, title = $2, description = $3, content = $4, tags = $5, read_time = $6, updated_at = CURRENT_TIMESTAMP
         WHERE id = $7
         RETURNING *`,
        [slug, title, description, content, tags, read_time, id]
    );

    if (result.rowCount === 0) {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const result = await query('DELETE FROM blogs WHERE id = $1 RETURNING id', [id]);
        
        if (result.rowCount === 0) {
             return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }
        
        return NextResponse.json({ success: true, id });
    } catch (error) {
         console.error('Error deleting blog:', error);
         return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
    }
}
