#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const SITE_URL = 'https://trustednetworx.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/TrustedNetworx-Hero-Image.jpg`;
const DEFAULT_DESCRIPTION = 'TrustedNetworx is a managed telecom solutions provider delivering POTS replacement, AI consulting, internet connectivity, IP PBX, mobility, and voice solutions for enterprise and multi-site businesses.';

// Every @type the patch script injects as the source of truth for route-page
// JSON-LD. `stripStructuredData` drops any Helmet-rendered copy of these types
// BEFORE appending the deterministic ones, so a page never carries duplicates
// and the output is identical across builds regardless of Helmet flush timing.
const STRUCTURED_DATA_TYPES = [
  'BlogPosting',
  'Service',
  'SoftwareApplication',
  'FAQPage',
  'BreadcrumbList',
  'LocalBusiness',
];

function parseFrontmatter(raw) {
  const parts = raw.split('---');
  if (parts.length < 3) return { data: {}, content: '' };
  const fm = parts[1];
  const content = parts.slice(2).join('---').trim();
  const data = {};
  for (const line of fm.split('\n')) {
    const m = line.match(/^(\w+):\s*["']?(.*?)["']?\s*$/);
    if (m) data[m[1]] = m[2];
  }
  return { data, content };
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeJsonForScript(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

function replaceTag(html, regex, replacement) {
  if (regex.test(html)) return html.replace(regex, replacement);
  return html.replace('</head>', `${replacement}\n</head>`);
}

function upsertMeta(html, attr, name, content) {
  const regex = new RegExp(`\\s*<meta[^>]*${attr}="${name}"[^>]*>`, 'gi');
  const tag = `<meta ${attr}="${name}" content="${escapeAttr(content)}">`;
  html = html.replace(regex, '');
  return html.replace('</head>', `${tag}\n</head>`);
}

function upsertLink(html, rel, href) {
  const regex = new RegExp(`\\s*<link[^>]*rel="${rel}"[^>]*>`, 'gi');
  const tag = `<link rel="${rel}" href="${escapeAttr(href)}">`;
  html = html.replace(regex, '');
  return html.replace('</head>', `${tag}\n</head>`);
}

function upsertTitle(html, title) {
  const regex = /\s*<title>[\s\S]*?<\/title>/i;
  html = html.replace(regex, '');
  return html.replace('</head>', `<title>${escapeAttr(title)}</title>\n</head>`);
}

function stripStructuredData(html, type) {
  // Match each ld+json script individually (tolerating attributes like
  // react-helmet's data-rh="true"), parse it, and drop blocks of the given
  // @type. Non-greedy per-block matching avoids spanning across script tags.
  return html.replace(
    /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    (match, body) => {
      try {
        const data = JSON.parse(body);
        const types = Array.isArray(data)
          ? data.map((d) => d && d['@type'])
          : [data && data['@type']];
        if (types.includes(type)) return '';
      } catch {
        // Unparseable block — leave it alone.
      }
      return match;
    }
  );
}

function appendStructuredData(html, blocks) {
  const snippet = blocks
    .map((block) => `<script type="application/ld+json">${escapeJsonForScript(block)}</script>`)
    .join('');
  return html.replace('</head>', `${snippet}</head>`);
}

function versionedImageUrl(rootDir, imagePath) {
  if (!imagePath || !imagePath.startsWith('/')) return imagePath || DEFAULT_OG_IMAGE;
  const localPath = path.join(rootDir, 'public', imagePath.replace(/^\//, ''));
  if (!fs.existsSync(localPath)) return `${SITE_URL}${imagePath}`;
  const sha = crypto.createHash('sha256').update(fs.readFileSync(localPath)).digest('hex').slice(0, 12);
  return `${SITE_URL}${imagePath}?v=${sha}`;
}

/**
 * Remove the src attribute from any <video> whose class contains "hero-video".
 * HeroVideo attaches its source imperatively after window load; react-snap
 * snapshots the DOM after that attach, so without this strip the prerendered
 * HTML would carry a src and fetch the crawler-sized video file at parse time
 * on every viewport.
 */
function stripHeroVideoSrc(html) {
  return html.replace(
    /<video\b[^>]*class="[^"]*\bhero-video\b[^"]*"[^>]*>/g,
    (tag) => tag.replace(/\s+src="[^"]*"/g, '')
  );
}

function patchPage(filePath, seo) {
  let html = fs.readFileSync(filePath, 'utf8');
  html = stripHeroVideoSrc(html);
  if (seo.heroPoster) {
    html = html.replace(
      '</head>',
      `<link rel="preload" as="image" href="${seo.heroPoster}" fetchpriority="high">\n</head>`
    );
  }
  html = upsertTitle(html, seo.title);
  html = upsertMeta(html, 'name', 'description', seo.description);
  html = upsertLink(html, 'canonical', seo.canonical);
  html = upsertMeta(html, 'property', 'og:type', seo.type);
  html = upsertMeta(html, 'property', 'og:title', seo.title);
  html = upsertMeta(html, 'property', 'og:description', seo.description);
  html = upsertMeta(html, 'property', 'og:url', seo.canonical);
  html = upsertMeta(html, 'property', 'og:image', seo.image);
  html = upsertMeta(html, 'name', 'twitter:card', 'summary_large_image');
  html = upsertMeta(html, 'name', 'twitter:title', seo.title);
  html = upsertMeta(html, 'name', 'twitter:description', seo.description);
  html = upsertMeta(html, 'name', 'twitter:image', seo.image);

  for (const type of STRUCTURED_DATA_TYPES) {
    html = stripStructuredData(html, type);
  }
  if (seo.jsonLd && seo.jsonLd.length) {
    html = appendStructuredData(html, seo.jsonLd);
  }

  fs.writeFileSync(filePath, html, 'utf8');
}

function ensureHtmlShell(filePath, fallbackHtmlPath) {
  if (fs.existsSync(filePath)) return;
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.copyFileSync(fallbackHtmlPath, filePath);
}

function patchBlogIndex(distDir) {
  const filePath = path.join(distDir, 'blog', 'index.html');
  ensureHtmlShell(filePath, path.join(distDir, 'index.html'));
  patchPage(filePath, {
    title: 'TrustedNetworx Blog | Telecom, AI & Connectivity Insights',
    description: 'Practical insights on telecom modernization, AI for business, compliance, and connectivity from TrustedNetworx.',
    canonical: `${SITE_URL}/blog`,
    image: DEFAULT_OG_IMAGE,
    type: 'website',
    jsonLd: [],
  });
}

function patchBlogPosts(distDir, srcBlogDir, rootDir) {
  const files = fs.readdirSync(srcBlogDir).filter((file) => file.endsWith('.md'));
  for (const file of files) {
    const slug = file.replace(/\.md$/, '');
    const raw = fs.readFileSync(path.join(srcBlogDir, file), 'utf8');
    const { data } = parseFrontmatter(raw);
    const htmlPath = path.join(distDir, 'blog', slug, 'index.html');
    ensureHtmlShell(htmlPath, path.join(distDir, 'index.html'));

    const title = data.title || slug;
    const description = data.description || DEFAULT_DESCRIPTION;
    const canonical = `${SITE_URL}/blog/${slug}`;
    const image = versionedImageUrl(rootDir, data.image);
    const articleJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description,
      image,
      datePublished: data.date,
      dateModified: data.dateModified || data.date,
      articleSection: data.category || 'Blog',
      author:
        !data.author || data.author === 'TrustedNetworx'
          ? { '@type': 'Organization', name: 'TrustedNetworx' }
          : { '@type': 'Person', name: data.author },
      publisher: {
        '@type': 'Organization',
        name: 'TrustedNetworx',
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.svg` },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    };
    const breadcrumbJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: title, item: canonical },
      ],
    };

    patchPage(htmlPath, {
      title: `${title} | TrustedNetworx Blog`,
      description,
      canonical,
      image,
      type: 'article',
      jsonLd: [articleJsonLd, breadcrumbJsonLd],
    });
  }
}

// --- Static route pages (non-blog) ---
// These pages get unique HTML shells with proper SEO meta so search engines
// see correct titles/descriptions without needing to execute JavaScript.

// Intermediate path segments that map to a real page (mirrors Seo.tsx so the
// prerendered BreadcrumbList matches what the runtime component emits).
const SECTION_ROUTES = { tools: '/tools', about: '/about', 'about/team': '/about/team' };

function titleCase(seg) {
  return seg.replace(/-/g, ' ').replace(/\b\w/g, (ch) => ch.toUpperCase());
}

/** BreadcrumbList mirroring src/components/Seo.tsx buildBreadcrumbs(). */
function buildBreadcrumbList(route) {
  const segments = route.split('/').filter(Boolean);
  const items = [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL }];
  let acc = '';
  segments.forEach((seg, i) => {
    acc += `/${seg}`;
    const isLeaf = i === segments.length - 1;
    // Only link intermediate segments that resolve to a real page.
    if (!isLeaf && !SECTION_ROUTES[acc.slice(1)]) return;
    items.push({
      '@type': 'ListItem',
      position: items.length + 1,
      name: titleCase(seg),
      item: `${SITE_URL}${acc}`,
    });
  });
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

/** Service schema for the six solution pages (audit #10 / Sprint 4 A2). */
function serviceJsonLd({ name, serviceType, route, description }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    provider: { '@type': 'Organization', name: 'TrustedNetworx' },
    areaServed: { '@type': 'Country', name: 'US' },
    serviceType,
    description,
    url: `${SITE_URL}/${route}`,
  };
}

/** SoftwareApplication schema for the two platform pages (no offers). */
function softwareAppJsonLd({ name, description }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description,
  };
}

function faqPageJsonLd(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

const ROUTE_PAGES = [
  {
    route: 'about',
    title: 'About Us | TrustedNetworx',
    description: 'With 25+ years in telecom and IoT, TrustedNetworx delivers advanced connectivity, voice, and managed solutions for enterprise and multi-site organizations.',
    jsonLd: [buildBreadcrumbList('about')],
  },
  {
    route: 'about/team',
    title: 'Our Team | TrustedNetworx',
    description: 'Meet the leadership and partners behind TrustedNetworx — telecom experts, enterprise architects, and creative professionals driving connectivity forward.',
    jsonLd: [buildBreadcrumbList('about/team')],
  },
  {
    route: 'pots-replacement',
    heroPoster: '/media/hero-pots-poster.jpg',
    title: 'POTS Replacement | TrustedNetworx',
    description: 'Modern, cost-saving alternatives to legacy POTS lines. Migrate analog systems to reliable IP and cellular networks with TrustedNetworx.',
    jsonLd: [
      serviceJsonLd({
        name: 'POTS Replacement',
        serviceType: 'Telecom Line Replacement',
        route: 'pots-replacement',
        description: 'Modern, cost-saving alternatives to legacy POTS lines.',
      }),
      buildBreadcrumbList('pots-replacement'),
    ],
  },
  {
    route: 'ai-consulting',
    heroPoster: '/media/hero-ai-consulting-poster.jpg',
    title: 'AI Consulting & Solutions | TrustedNetworx',
    description: 'Practical AI consulting and implementation for telecom operators, channel partners, and multi-site businesses — automation, customer engagement, and strategy with measurable ROI.',
    jsonLd: [
      serviceJsonLd({
        name: 'AI Consulting',
        serviceType: 'AI Consulting',
        route: 'ai-consulting',
        description: 'Practical AI consulting and implementation for telecom and multi-site businesses.',
      }),
      buildBreadcrumbList('ai-consulting'),
    ],
  },
  {
    route: 'ai-workforce',
    heroPoster: '/media/hero-ai-workforce-poster.jpg',
    title: 'AI Workforce — AI Agents for Telecom | TrustedNetworx',
    description: 'Deploy AI sales, service, and operations agents built for telecom. Lead qualification, scheduling, email triage, infrastructure monitoring — 24/7, telecom-native.',
    jsonLd: [
      serviceJsonLd({
        name: 'AI Workforce',
        serviceType: 'AI Agents',
        route: 'ai-workforce',
        description: 'AI agents for sales, service, and operations, built for telecom.',
      }),
      buildBreadcrumbList('ai-workforce'),
    ],
  },
  // NOTE: /fleet-management intentionally removed — it 301s to /ai-consulting in
  // netlify.toml (no dedicated page exists; a patched shell here would create a
  // duplicate-content page with mismatched meta).
  {
    route: 'internet-connectivity',
    heroPoster: '/media/hero-connectivity-poster.jpg',
    title: 'Internet Connectivity | TrustedNetworx',
    description: 'Enterprise-grade internet connectivity — managed SD-WAN, Starlink satellite broadband, and global IoT SIM solutions to keep your business securely online.',
    jsonLd: [
      serviceJsonLd({
        name: 'Internet Connectivity',
        serviceType: 'Enterprise Internet',
        route: 'internet-connectivity',
        description: 'Enterprise-grade internet connectivity with managed SD-WAN and wireless failover.',
      }),
      buildBreadcrumbList('internet-connectivity'),
    ],
  },
  {
    route: 'voice-solutions',
    heroPoster: '/media/hero-voice-poster.jpg',
    title: 'Voice Solutions — IP PBX & Unified Communications | TrustedNetworx',
    description: 'Enterprise voice communications from TrustedNetworx — cloud-based IP PBX, HD voice, unified communications, voice analytics, and scalable cloud calling for modern business.',
    jsonLd: [
      serviceJsonLd({
        name: 'Voice Solutions / IP PBX',
        serviceType: 'Unified Communications',
        route: 'voice-solutions',
        description: 'Cloud IP PBX and unified communications for multi-site businesses.',
      }),
      buildBreadcrumbList('voice-solutions'),
    ],
  },
  {
    route: 'mobility-solutions',
    heroPoster: '/media/hero-mobility-poster.jpg',
    title: 'Mobility Solutions | TrustedNetworx',
    description: 'Enterprise mobility management from TrustedNetworx — MDaaS, IoT connectivity, and unified endpoint management to keep your mobile workforce secure and productive.',
    jsonLd: [
      serviceJsonLd({
        name: 'Mobility Solutions',
        serviceType: 'Enterprise Mobility Management',
        route: 'mobility-solutions',
        description: 'Enterprise mobility management and IoT connectivity.',
      }),
      buildBreadcrumbList('mobility-solutions'),
    ],
  },
  {
    route: 'platforms/partner-hub',
    title: 'TNX Partner Hub — AI Agent Management Platform for MSPs & Channel Partners | TrustedNetworx',
    description: 'Deploy, budget, monitor, and govern AI agents for sales, support, and operations from one multi-tenant hub. Built by an operator, for MSPs and resellers.',
    jsonLd: [
      softwareAppJsonLd({
        name: 'TNX Partner Hub',
        description:
          'AI agent management platform for MSPs and channel partners: deploy, budget, monitor, and govern AI agents from one multi-tenant hub.',
      }),
      faqPageJsonLd([
        { q: 'Which AI models does it use?', a: 'Model-agnostic; default is a cost-optimized provider with the option to bring your own keys.' },
        { q: 'Do I need developers?', a: 'No for blueprint agents. Yes for custom integrations, which we can build.' },
        { q: 'Where does it run?', a: 'Dedicated VPS per client or shared multi-tenant, your choice.' },
        { q: 'Is my client data isolated?', a: 'Yes — tenant isolation is enforced at the database layer, not just the UI.' },
      ]),
      buildBreadcrumbList('platforms/partner-hub'),
    ],
  },
  {
    route: 'platforms/crm',
    title: 'TNX CRM — Opportunity Management for Telecom, MSP & Channel Sales | TrustedNetworx',
    description: 'Track direct, agent, and reseller deals with telecom-native fields and AI agents that keep the pipeline current. Simple, flat pricing.',
    jsonLd: [
      softwareAppJsonLd({
        name: 'TNX CRM',
        description:
          'Opportunity management for telecom, MSP and channel sales: direct, agent, and reseller pipelines with telecom-native fields.',
      }),
      faqPageJsonLd([
        { q: 'Can I import from Pipedrive / HubSpot?', a: 'Yes — CSV import with field mapping.' },
        { q: 'Does it replace Partner Hub?', a: 'No. Partner Hub manages agents; TNX CRM manages deals. They share data.' },
        { q: 'Can partners see each other\u2019s deals?', a: 'No. Partner visibility is scoped to their own book.' },
      ]),
      buildBreadcrumbList('platforms/crm'),
    ],
  },
  {
    route: 'partners',
    title: 'Become a Partner — MSP & Reseller Program | TrustedNetworx',
    description: 'Join the TrustedNetworx partner program for MSPs, telecom agents, and resellers. White-label telecom and AI, TNX Partner Hub, and commission on every deal.',
    jsonLd: [buildBreadcrumbList('partners')],
  },
  {
    route: 'ai',
    title: 'AI for Telecom & Multi-Site Operators | TrustedNetworx',
    description: 'AI agents and consulting for telecom and multi-site operators. Explore the AI workforce, run a readiness assessment, and read the latest on AI in telecom.',
    jsonLd: [buildBreadcrumbList('ai')],
  },
  {
    route: 'tools',
    title: 'Free Telecom Assessment Tools | TrustedNetworx',
    description: 'Interactive tools to evaluate your telecom infrastructure: POTS replacement ROI, copper sunset risk, and business continuity readiness.',
    jsonLd: [buildBreadcrumbList('tools')],
  },
  {
    route: 'tools/pots-roi-calculator',
    title: 'POTS Replacement ROI Calculator | TrustedNetworx',
    description: 'Calculate the cost savings of replacing legacy POTS lines with IP/cellular alternatives. See estimated ROI, break-even timeline, and total cost of ownership.',
    jsonLd: [buildBreadcrumbList('tools/pots-roi-calculator')],
  },
  {
    route: 'tools/copper-sunset-risk',
    title: 'Copper Sunset Risk Assessment | TrustedNetworx',
    description: 'Assess your organization\'s exposure to the copper network shutdown. Identify at-risk phone lines, elevator lines, alarm panels, and fax machines.',
    jsonLd: [buildBreadcrumbList('tools/copper-sunset-risk')],
  },
  {
    route: 'tools/failover-readiness',
    title: 'Failover Readiness Check | TrustedNetworx',
    description: 'Check how prepared your business is for an internet outage. Score your network resilience and get recommendations for LTE/5G wireless failover.',
    jsonLd: [buildBreadcrumbList('tools/failover-readiness')],
  },
  {
    route: 'tools/ai-roi-calculator',
    title: 'AI Implementation ROI Calculator | TrustedNetworx',
    description: 'Estimate the return on investment for AI automation in your business. Compare manual vs. AI-powered workflows across sales, service, and operations.',
    jsonLd: [buildBreadcrumbList('tools/ai-roi-calculator')],
  },
  {
    route: 'tools/ai-readiness',
    title: 'AI Readiness Assessment | TrustedNetworx',
    description: 'Evaluate your organization\'s readiness for AI adoption. Score data maturity, operational readiness, and workforce alignment for successful AI deployment.',
    jsonLd: [buildBreadcrumbList('tools/ai-readiness')],
  },
  {
    route: 'contact',
    title: 'Contact Us | TrustedNetworx',
    description: 'Get in touch with the TrustedNetworx team to discuss your managed telecom, connectivity, voice, and AI needs.',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'TrustedNetworx',
        telephone: '+1-305-498-7530',
        email: 'sales@trustednetworx.com',
        url: 'https://trustednetworx.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '18001 Old Cutler Rd',
          addressLocality: 'Miami',
          addressRegion: 'FL',
          postalCode: '33157',
          addressCountry: 'US',
        },
        openingHours: 'Mo-Fr 09:00-18:00',
      },
      buildBreadcrumbList('contact'),
    ],
  },
];

function patchRoutePages(distDir) {
  const fallbackHtmlPath = path.join(distDir, 'index.html');
  let count = 0;

  for (const { route, title, description, jsonLd, heroPoster } of ROUTE_PAGES) {
    const filePath = path.join(distDir, route, 'index.html');
    ensureHtmlShell(filePath, fallbackHtmlPath);
    patchPage(filePath, {
      title,
      description,
      canonical: `${SITE_URL}/${route}`,
      image: DEFAULT_OG_IMAGE,
      type: 'website',
      jsonLd: jsonLd || [],
      heroPoster,
    });
    count++;
  }

  console.log(`[postbuild] Patched ${count} route page SEO shells.`);
}

function main() {
  const root = path.join(__dirname, '..');
  const distDir = path.join(root, 'dist');
  const srcBlogDir = path.join(root, 'src', 'content', 'blog');

  patchBlogIndex(distDir);
  patchBlogPosts(distDir, srcBlogDir, root);
  patchRoutePages(distDir);

  // Homepage shell: strip the hero video src (so parse time never fetches it)
  // and preload the poster — the LCP element that is otherwise discovered late
  // as a CSS background-image.
  const indexPath = path.join(distDir, 'index.html');
  let indexHtml = fs.readFileSync(indexPath, 'utf8');
  indexHtml = stripHeroVideoSrc(indexHtml);
  indexHtml = indexHtml.replace(
    '</head>',
    '<link rel="preload" as="image" href="/media/hero-home-poster.jpg" fetchpriority="high">\n</head>'
  );
  fs.writeFileSync(indexPath, indexHtml, 'utf8');

  console.log('[postbuild] Patched prerendered blog SEO metadata.');
}

main();
