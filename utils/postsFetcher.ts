/* eslint-disable import/order */
import matter from 'gray-matter';
import * as fs from 'fs';
import * as path from 'path';
import { SingleArticle } from 'types';

export interface PostMeta {
  title: string;
  description: string;
  date: string;
  category: string; // Changed from tags
  author: string;
  imageUrl: string;
  readTime?: string;
}

export async function getAllPosts() {
  const posts = await Promise.all(getAllPostsSlugs().map(getSinglePost));

  return posts.sort((a, b) => {
    return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
  });
}

export function getAllPostsSlugs() {
  const postsDirectory = getPostsDirectory();

  if (!fs.existsSync(postsDirectory)) {
    console.warn('Posts directory not found. Creating...');
    fs.mkdirSync(postsDirectory, { recursive: true });
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((filename) => filename.endsWith('.mdx'))
    .map(normalizePostName);
}

function normalizePostName(postName: string) {
  return postName.replace(/\.mdx$/, '');
}

export async function getSinglePost(slug: string): Promise<SingleArticle> {
  const filePath = path.join(getPostsDirectory(), `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Post not found: ${slug}`);
  }

  const contents = fs.readFileSync(filePath, 'utf8');
  const { data: meta, content } = matter(contents);

  // Set default values for optional fields
  const defaultMeta = {
    title: 'Untitled Post',
    description: '',
    date: new Date().toISOString(),
    category: 'Uncategorized', // Changed from tags
    author: 'Team Wurana',
    imageUrl: '/blog/default-hero.jpg',
    readTime: null, // Changed from undefined to null for serialization
    ...meta,
  };

  // Ensure the blog images directory exists
  const blogImagesDir = path.join(process.cwd(), 'public', 'blog');
  if (!fs.existsSync(blogImagesDir)) {
    fs.mkdirSync(blogImagesDir, { recursive: true });
  }

  // Validate image path
  const publicImagePath = path.join(process.cwd(), 'public', defaultMeta.imageUrl.replace(/^\//, ''));

  if (!fs.existsSync(publicImagePath)) {
    console.warn(`Warning: Image not found for post ${slug}: ${defaultMeta.imageUrl}`);
    defaultMeta.imageUrl = '/blog/default-hero.jpg';
  }

  return {
    slug,
    content,
    meta: {
      ...defaultMeta,
      date: defaultMeta.date.toString(), // Ensure date is string
    } as SingleArticle['meta'],
  };
}

export function getPostsDirectory() {
  return path.join(process.cwd(), 'posts');
}

export async function getRecentPosts(count: number = 3): Promise<SingleArticle[]> {
  const posts = await getAllPosts();
  return posts.slice(0, count);
}

export async function getPostsByCategory(category: string): Promise<SingleArticle[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.meta.category.toLowerCase() === category.toLowerCase());
}

// Add utility function to calculate read time
export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}
