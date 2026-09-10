// Every Markdown file in src/content/blog is a post; the filename is the slug.
// Adding a post = adding one .md file. No registry to edit.
const POST_FILES = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

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
  image?: string;
}

/**
 * Simple frontmatter parser — no gray-matter dependency.
 * Parses YAML-like key: "value" pairs between --- delimiters.
 */
function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const parts = raw.split('---');
  if (parts.length < 3) {
    return { data: {}, content: raw };
  }

  const frontmatterBlock = parts[1];
  const content = parts.slice(2).join('---').trim();
  const data: Record<string, string> = {};

  // Parse simple key: "value" lines (handles quoted and unquoted values)
  const lines = frontmatterBlock.split('\n');
  for (const line of lines) {
    const match = line.match(/^(\w+):\s*["']?(.*?)["']?\s*$/);
    if (match) {
      data[match[1]] = match[2];
    }
  }

  return { data, content };
}

function buildExcerpt(content: string): string {
  return content
    .replace(/^#{1,6}\s.*$/gm, '')
    .replace(/[#*_>`\[\]()]/g, '')
    .replace(/\n+/g, ' ')
    .trim()
    .slice(0, 150) + '...';
}

const RAW_POSTS: [string, string][] = Object.entries(POST_FILES).map(([path, raw]) => [
  path.slice(path.lastIndexOf('/') + 1).replace(/\.md$/, ''),
  raw,
]);

const ALL_POSTS: BlogPost[] = RAW_POSTS
  .filter(([, raw]) => !parseFrontmatter(raw).data.redirect)
  .map(([slug, raw]) => {
    const { data, content } = parseFrontmatter(raw);
    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      category: data.category || 'Uncategorized',
      description: data.description || '',
      author: data.author || 'Carter Dewey',
      readTime: data.readTime || '5 min read',
      image: data.image || undefined,
      content,
      excerpt: buildExcerpt(content),
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getAllPosts(): BlogPost[] {
  return ALL_POSTS;
}

export function getPostBySlug(slug: string): BlogPost | null {
  return ALL_POSTS.find((p) => p.slug === slug) || null;
}

export function getCategories(): string[] {
  const categories = new Set(ALL_POSTS.map((p) => p.category));
  return Array.from(categories).sort();
}

/* ------------------------------------------------------------------ */
/* Blog images                                                         */
/* ------------------------------------------------------------------ */

const IMAGE_VERSIONS: Record<string, string> =
  typeof __BLOG_IMAGE_VERSIONS__ === 'undefined' ? {} : __BLOG_IMAGE_VERSIONS__;
const IMAGE_ROOT = '/blog-images/';

/** "/blog-images/x.png" -> "/blog-images/x.png?v=<hash>", or null if the file isn't in the build. */
function versioned(relPath: string): string | null {
  const v = IMAGE_VERSIONS[relPath];
  return v ? `${IMAGE_ROOT}${relPath}?v=${v}` : null;
}

function imageStem(image: string): string | null {
  if (!image.startsWith(IMAGE_ROOT)) return null;
  const file = image.slice(IMAGE_ROOT.length);
  return file.includes('/') ? null : file.replace(/\.[a-z0-9]+$/i, '');
}

/**
 * Hero image for the article page: the compressed JPEG in /blog-images/hero/
 * when it exists, otherwise the original PNG. Always cache-busted.
 */
export function heroImageSrc(post: BlogPost): string | undefined {
  if (!post.image) return undefined;
  const stem = imageStem(post.image);
  if (!stem) return post.image;
  return versioned(`hero/${stem}.jpg`) ?? versioned(`${stem}.png`) ?? post.image;
}

/**
 * Thumbnail for the blog list: /blog-images/thumbs/<stem>.jpg when it exists,
 * otherwise the hero. A missing thumbnail never renders as a broken image.
 */
export function thumbImageSrc(post: BlogPost): string | undefined {
  if (!post.image) return undefined;
  const stem = imageStem(post.image);
  if (!stem) return post.image;
  return versioned(`thumbs/${stem}.jpg`) ?? heroImageSrc(post);
}
