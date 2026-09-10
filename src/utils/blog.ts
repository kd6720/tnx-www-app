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
  /** Optional shorter title for <title>/og:title when the full title is too long. */
  seoTitle?: string;
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
      seoTitle: data.seoTitle || undefined,
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

/**
 * Related reading for an article: the next three posts after this one in its
 * category, wrapping around the end.
 *
 * A fixed window rather than "the three newest" — newest-first gave every post
 * the same three newest targets, so 39 of 55 posts received no inbound blog link
 * at all. Taking i+1..i+3 from the category (ALL_POSTS is date-sorted, so this
 * is the next three going back in time) gives every post exactly three inbound
 * and three outbound links inside its category. Tops up from other categories
 * when the category has fewer than four posts.
 */
export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const sameCategory = ALL_POSTS.filter((p) => p.category === post.category);
  const i = sameCategory.findIndex((p) => p.slug === post.slug);
  const window = i === -1
    ? sameCategory
    : [...sameCategory.slice(i + 1), ...sameCategory.slice(0, i)];
  const otherCategories = ALL_POSTS.filter((p) => p.category !== post.category);
  return [...window, ...otherCategories].slice(0, limit);
}

/**
 * One hub link per blog category. Only routes that already exist are listed —
 * Industry Spotlights has no hub page (SEO pass 2026-09-10).
 */
export const CATEGORY_HUBS: Record<string, { to: string; label: string }> = {
  'AI for Business': { to: '/ai', label: 'AI for Business' },
  'Compliance & Regulation': { to: '/pots-replacement', label: 'POTS Replacement' },
  'Telecom Modernization': { to: '/voice-solutions', label: 'Voice Solutions' },
};

/**
 * Document title for a post: "<title> | TrustedNetworx" when that fits within
 * 60 characters, otherwise the bare title. A frontmatter `seoTitle` replaces
 * the base title when present. The on-page <h1> always keeps the full title.
 */
export function postDocumentTitle(post: Pick<BlogPost, 'title' | 'seoTitle'>): string {
  const base = post.seoTitle || post.title;
  const withBrand = `${base} | TrustedNetworx`;
  return withBrand.length <= 60 ? withBrand : base;
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
