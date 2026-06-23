import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  description: string;
  author: string;
  readTime: string;
  content: string;
  excerpt: string;
}

/**
 * Extract a URL-safe slug from a file path.
 */
export function getPostSlug(filePath: string): string {
  const filename = filePath.split('/').pop() || '';
  return filename.replace(/\.md$/, '');
}

/**
 * Load all blog posts, parse frontmatter, and return sorted by date descending.
 */
export function getAllPosts(): BlogPost[] {
  const modules = import.meta.glob(
    '/src/content/blog/*.md',
    { query: '?raw', import: 'default', eager: true },
  );

  const posts: BlogPost[] = [];

  for (const [filePath, raw] of Object.entries(modules)) {
    const slug = getPostSlug(filePath);
    const { data, content } = matter(raw as string);

    posts.push({
      slug,
      title: data.title || '',
      date: data.date || '',
      category: data.category || '',
      description: data.description || '',
      author: data.author || '',
      readTime: data.readTime || '',
      content,
      excerpt: content.replace(/^#{1,6}\s.*$/gm, '').replace(/[#*_>`\[\]()]/g, '').replace(/\n+/g, ' ').trim().slice(0, 150) + '...',
    });
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

/**
 * Get a single blog post by slug.
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}

/**
 * Get unique category list from all posts.
 */
export function getCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((p) => p.category));
  return Array.from(categories).sort();
}
