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
  // Vite 5 import.meta.glob with eager:true and ?raw returns Record<string, { default: string }>
  const modules = import.meta.glob(
    '/src/content/blog/*.md',
    { query: '?raw', eager: true },
  ) as Record<string, { default: string }>;

  const posts: BlogPost[] = [];

  for (const [filePath, mod] of Object.entries(modules)) {
    try {
      const slug = getPostSlug(filePath);
      const raw = mod.default;

      if (!raw || typeof raw !== 'string') {
        console.warn(`Blog post ${filePath} returned non-string content:`, typeof raw);
        continue;
      }

      const { data, content } = matter(raw);

      posts.push({
        slug,
        title: data.title || slug,
        date: data.date || '',
        category: data.category || 'Uncategorized',
        description: data.description || '',
        author: data.author || 'Carter Dewey',
        readTime: data.readTime || '5 min read',
        content,
        excerpt: content
          .replace(/^#{1,6}\s.*$/gm, '')
          .replace(/[#*_>`\[\]()]/g, '')
          .replace(/\n+/g, ' ')
          .trim()
          .slice(0, 150) + '...',
      });
    } catch (err) {
      console.error(`Failed to parse blog post ${filePath}:`, err);
    }
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
