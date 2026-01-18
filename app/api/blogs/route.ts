import { NextRequest, NextResponse } from 'next/server';
import { query, initializeDatabase } from '@/lib/db';

export async function GET() {
  try {
    await initializeDatabase();
    const result = await query('SELECT * FROM blogs ORDER BY published_at DESC');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await initializeDatabase();
    const body = await request.json();
    const { slug, title, description, content, tags, read_time } = body;
    
    // Basic validation
    if (!slug || !title || !content) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await query(
      `INSERT INTO blogs (slug, title, description, content, tags, read_time)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [slug, title, description, content, tags, read_time]
    );
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}
