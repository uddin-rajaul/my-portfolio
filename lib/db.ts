import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;

// Helper function to run queries
export async function query(text: string, params?: unknown[]) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}

// Track if database has been initialized this session
let dbInitialized = false;
let initializationPromise: Promise<void> | null = null;

// Initialize database tables
export async function initializeDatabase() {
  if (dbInitialized) return;
  
  // If initialization is already in progress, wait for it
  if (initializationPromise) {
    return initializationPromise;
  }
  
  initializationPromise = doInitialize();
  return initializationPromise;
}

async function doInitialize() {
  try {
    // Use IF NOT EXISTS for all table creations
    await query(`
      CREATE TABLE IF NOT EXISTS photos (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        location VARCHAR(255),
        description TEXT,
        cloudinary_url TEXT NOT NULL,
        cloudinary_public_id VARCHAR(255) NOT NULL,
        size VARCHAR(20) DEFAULT 'normal' CHECK (size IN ('normal', 'tall', 'wide')),
        width INTEGER,
        height INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Create page_views table for analytics
    await query(`
      CREATE TABLE IF NOT EXISTS page_views (
        id SERIAL PRIMARY KEY,
        page VARCHAR(255) NOT NULL,
        visitor_id VARCHAR(255) NOT NULL,
        ip_address VARCHAR(45),
        user_agent TEXT,
        referrer TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Create indexes if they don't exist
    await query(`
      CREATE INDEX IF NOT EXISTS idx_page_views_visitor_id ON page_views(visitor_id);
    `);
    await query(`
      CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);
    `);
    
    dbInitialized = true;
    console.log('Database initialized successfully');
  } catch (error) {
    // Reset promise on error so it can be retried
    initializationPromise = null;
    console.error('Error initializing database:', error);
    throw error;
  }
}
