// Direct raw imports of all blog posts (Vite ?raw gives us the file as a string)
import _5gLteLastMile from '../content/blog/5g-lte-last-mile-business-connectivity.md?raw';
import aiIsReshapingTelecom from '../content/blog/ai-is-reshaping-telecom.md?raw';
import aiReadinessChecklist from '../content/blog/ai-readiness-checklist-for-midsize-organizations.md?raw';
import aiWorkflowsThatWork from '../content/blog/ai-workflows-that-work-patterns-for-telecom.md?raw';
import businessContinuityWireless from '../content/blog/business-continuity-wireless-failover.md?raw';
import copperSunsetTimeline from '../content/blog/copper-sunset-timeline.md?raw';
import realRoiOfAi from '../content/blog/real-roi-of-ai-in-telecom.md?raw';
import seniorLivingTelecom from '../content/blog/senior-living-telecom-compliance-guide.md?raw';
import whyPotsReplacement from '../content/blog/why-pots-replacement-matters-now.md?raw';
import endOfT1Lines from '../content/blog/end-of-t1-lines-migration-strategies.md?raw';
import multiSiteTelecomConsolidation from '../content/blog/multi-site-telecom-consolidation-one-vendor-vs-many.md?raw';
import carrierDisconnectionNotice from '../content/blog/what-happens-when-carrier-sends-disconnection-notice.md?raw';
import fixedWirelessVsFiberVsCable from '../content/blog/fixed-wireless-vs-fiber-vs-cable-primary-connection.md?raw';
import hiddenCostsLegacyPhoneSystems from '../content/blog/hidden-costs-legacy-phone-systems-2026.md?raw';
import howPropertyManagersCuttingTelecomCosts from '../content/blog/how-property-managers-cutting-telecom-costs.md?raw';
import telecomAuditsOverpaying from '../content/blog/telecom-audits-what-youre-probably-overpaying-for.md?raw';
import aiEmailTriage from '../content/blog/ai-email-triage-stop-drowning-in-inbox.md?raw';
import sdWanExplained from '../content/blog/sd-wan-explained-for-business-leaders.md?raw';
import whenAiSalesAgentsOutperformHumans from '../content/blog/when-ai-sales-agents-outperform-humans.md?raw';
import thirtyDayAiPilot from '../content/blog/30-day-ai-pilot-how-to-test-ai.md?raw';
import aiPoweredCustomerService from '../content/blog/ai-powered-customer-service-24-7-support.md?raw';

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

const RAW_POSTS: [string, string][] = [
  ['end-of-t1-lines-migration-strategies', endOfT1Lines],
  ['5g-lte-last-mile-business-connectivity', _5gLteLastMile],
  ['ai-is-reshaping-telecom', aiIsReshapingTelecom],
  ['ai-readiness-checklist-for-midsize-organizations', aiReadinessChecklist],
  ['ai-workflows-that-work-patterns-for-telecom', aiWorkflowsThatWork],
  ['business-continuity-wireless-failover', businessContinuityWireless],
  ['copper-sunset-timeline', copperSunsetTimeline],
  ['real-roi-of-ai-in-telecom', realRoiOfAi],
  ['senior-living-telecom-compliance-guide', seniorLivingTelecom],
  ['why-pots-replacement-matters-now', whyPotsReplacement],
  ['multi-site-telecom-consolidation-one-vendor-vs-many', multiSiteTelecomConsolidation],
  ['what-happens-when-carrier-sends-disconnection-notice', carrierDisconnectionNotice],
  ['fixed-wireless-vs-fiber-vs-cable-primary-connection', fixedWirelessVsFiberVsCable],
  ['hidden-costs-legacy-phone-systems-2026', hiddenCostsLegacyPhoneSystems],
  ['how-property-managers-cutting-telecom-costs', howPropertyManagersCuttingTelecomCosts],
  ['telecom-audits-what-youre-probably-overpaying-for', telecomAuditsOverpaying],
  ['ai-email-triage-stop-drowning-in-inbox', aiEmailTriage],
  ['sd-wan-explained-for-business-leaders', sdWanExplained],
  ['when-ai-sales-agents-outperform-humans', whenAiSalesAgentsOutperformHumans],
  ['30-day-ai-pilot-how-to-test-ai', thirtyDayAiPilot],
  ['ai-powered-customer-service-24-7-support', aiPoweredCustomerService],
];

const ALL_POSTS: BlogPost[] = RAW_POSTS
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
