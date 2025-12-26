import { NextRequest, NextResponse } from 'next/server';
import { query, initializeDatabase } from '@/lib/db';

// POST - Track a page view
export async function POST(request: NextRequest) {
  try {
    await initializeDatabase();
    
    const body = await request.json();
    const { page, visitorId } = body;
    
    if (!page || !visitorId) {
      return NextResponse.json(
        { error: 'Page and visitorId are required' },
        { status: 400 }
      );
    }
    
    // Get IP and user agent
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    const userAgent = request.headers.get('user-agent') || '';
    const referrer = request.headers.get('referer') || '';
    
    await query(
      `INSERT INTO page_views (page, visitor_id, ip_address, user_agent, referrer)
       VALUES ($1, $2, $3, $4, $5)`,
      [page, visitorId, ip, userAgent, referrer]
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking page view:', error);
    return NextResponse.json(
      { error: 'Failed to track page view' },
      { status: 500 }
    );
  }
}

// GET - Get analytics stats
export async function GET() {
  try {
    await initializeDatabase();
    
    // Total page views
    const totalViewsResult = await query('SELECT COUNT(*) as count FROM page_views');
    const totalViews = parseInt(totalViewsResult.rows[0].count);
    
    // Unique visitors (by visitor_id)
    const uniqueVisitorsResult = await query(
      'SELECT COUNT(DISTINCT visitor_id) as count FROM page_views'
    );
    const uniqueVisitors = parseInt(uniqueVisitorsResult.rows[0].count);
    
    // Today's visitors
    const todayVisitorsResult = await query(
      `SELECT COUNT(DISTINCT visitor_id) as count FROM page_views 
       WHERE created_at >= CURRENT_DATE`
    );
    const todayVisitors = parseInt(todayVisitorsResult.rows[0].count);
    
    // This week's visitors
    const weekVisitorsResult = await query(
      `SELECT COUNT(DISTINCT visitor_id) as count FROM page_views 
       WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'`
    );
    const weekVisitors = parseInt(weekVisitorsResult.rows[0].count);
    
    // Top pages
    const topPagesResult = await query(
      `SELECT page, COUNT(*) as views, COUNT(DISTINCT visitor_id) as unique_visitors
       FROM page_views 
       GROUP BY page 
       ORDER BY views DESC 
       LIMIT 5`
    );
    
    // Recent visitors (last 10)
    const recentVisitorsResult = await query(
      `SELECT DISTINCT ON (visitor_id) visitor_id, page, created_at
       FROM page_views 
       ORDER BY visitor_id, created_at DESC
       LIMIT 10`
    );
    
    return NextResponse.json({
      totalViews,
      uniqueVisitors,
      todayVisitors,
      weekVisitors,
      topPages: topPagesResult.rows,
      recentVisitors: recentVisitorsResult.rows,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
