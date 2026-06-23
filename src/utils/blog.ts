import matter from 'gray-matter';

// Direct raw imports of all blog posts
import _5gLteLastMile from '../content/blog/5g-lte-last-mile-business-connectivity.md?raw';
import aiIsReshapingTelecom from '../content/blog/ai-is-reshaping-telecom.md?raw';
import aiReadinessChecklist from '../content/blog/ai-readiness-checklist-for-midsize-organizations.md?raw';
import aiWorkflowsThatWork from '../content/blog/ai-workflows-that-work-patterns-for-telecom.md?raw';
import businessContinuityWireless from '../content/blog/business-continuity-wireless-failover.md?raw';
import copperSunsetTimeline from '../content/blog/copper-sunset-timeline.md?raw';
import realRoiOfAi from '../content/blog/real-roi-of-ai-in-telecom.md?raw';
import seniorLivingTelecom from '../content/blog/senior-living-telecom-compliance-guide.md?raw';
import whyPotsReplacement from '../content/blog/why-pots-replacement-matters-now.md?raw';

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

const RAW_POSTS: [string, string][] = [
  ['5g-lte-last-mile-business-connectivity', _5gLteLastMile],
  ['ai-is-reshaping-telecom', aiIsReshapingTelecom],
  ['ai-readiness-checklist-for-midsize-organizations', aiReadinessChecklist],
  ['ai-workflows-that-work-patterns-for-telecom', aiWorkflowsThatWork],
  ['business-continuity-wireless-failover', businessContinuityWireless],
  ['copper-sunset-timeline', copperSunsetTimeline],
  ['real-roi-of-ai-in-telecom', realRoiOfAi],
  ['senior-living-telecom-compliance-guide', seniorLivingTelecom],
  ['why-pots-replacement-matters-now', whyPotsReplacement],
];

function parsePost(slug: string, raw: string): BlogPost | null {
  try {
    const { data, content } = matter(raw);
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
      excerpt: content
        .replace(/^#{1,6}\s.*$/gm, '')
        .replace(/[#*_>`\[\]()]/g, '')
        .replace(/\n+/g, ' ')
        .trim()
        .slice(0, 150) + '...',
    };
  } catch (err) {
    console.error(`Failed to parse blog post ${slug}:`, err);
    return null;
  }
}

const ALL_POSTS: BlogPost[] = RAW_POSTS
  .map(([slug, raw]) => parsePost(slug, raw))
  .filter((p): p is BlogPost => p !== null)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

/**
 * Extract a URL-safe slug from a file path.
 */
export function getPostSlug(filePath: string): string {
  const filename = filePath.split('/').pop() || '';
  return filename.replace(/\.md$/, '');
}

/**
 * Load all blog posts, sorted by date descending.
 */
export function getAllPosts(): BlogPost[] {
  return ALL_POSTS;
}

/**
 * Get a single blog post by slug.
 */
export function getPostBySlug(slug: string): BlogPost | null {
  return ALL_POSTS.find((p) => p.slug === slug) || null;
}

/**
 * Get unique category list from all posts.
 */
export function getCategories(): string[] {
  const categories = new Set(ALL_POSTS.map((p) => p.category));
  return Array.from(categories).sort();
}
