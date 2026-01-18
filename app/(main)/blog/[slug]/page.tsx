import { query, initializeDatabase } from '@/lib/db';
import { notFound } from 'next/navigation';
import BlogPostClient from '@/components/blog/blog-post-client';
import { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
   const { slug } = params;
   try {
     await initializeDatabase();
     const result = await query('SELECT title, description FROM blogs WHERE slug = $1', [slug]);
     const post = result.rows[0];
     
     if (!post) {
       return { title: 'Blog Post Not Found' };
     }

     return {
       title: post.title,
       description: post.description,
     };
   } catch (error) {
     return { title: 'Blog' };
   }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = params;

  await initializeDatabase();
  const result = await query('SELECT * FROM blogs WHERE slug = $1', [slug]);
  const post = result.rows[0];

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
