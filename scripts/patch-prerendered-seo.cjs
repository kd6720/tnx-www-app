#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const SITE_URL = 'https://trustednetworx.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/TrustedNetworx-Hero-Image.jpg`;
const DEFAULT_DESCRIPTION = 'TrustedNetworx is a managed telecom solutions provider delivering POTS replacement, AI consulting, internet connectivity, IP PBX, mobility, and voice solutions for enterprise and multi-site businesses.';

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

function patchPage(filePath, seo) {
  let html = fs.readFileSync(filePath, 'utf8');
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

  for (const type of ['BlogPosting', 'BreadcrumbList']) {
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
      dateModified: data.date,
      articleSection: data.category || 'Blog',
      author: { '@type': 'Person', name: data.author || 'Carter Dewey' },
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
const ROUTE_PAGES = [
  {
    route: 'about',
    title: 'About Us | TrustedNetworx',
    description: 'With 25+ years in telecom and IoT, TrustedNetworx delivers advanced connectivity, voice, and managed solutions for enterprise and multi-site organizations.',
  },
  {
    route: 'about/team',
    title: 'Our Team | TrustedNetworx',
    description: 'Meet the leadership and partners behind TrustedNetworx — telecom experts, enterprise architects, and creative professionals driving connectivity forward.',
  },
  {
    route: 'pots-replacement',
    title: 'POTS Replacement | TrustedNetworx',
    description: 'Modern, cost-saving alternatives to legacy POTS lines. Migrate analog systems to reliable IP and cellular networks with TrustedNetworx.',
  },
  {
    route: 'ai-consulting',
    title: 'AI Consulting & Solutions | TrustedNetworx',
    description: 'Practical AI consulting and implementation for telecom operators, channel partners, and multi-site businesses — automation, customer engagement, and strategy with measurable ROI.',
  },
  {
    route: 'ai-workforce',
    title: 'AI Workforce — AI Agents for Telecom | TrustedNetworx',
    description: 'Deploy AI sales, service, and operations agents built for telecom. Lead qualification, scheduling, email triage, infrastructure monitoring — 24/7, telecom-native.',
  },
  // NOTE: /fleet-management intentionally removed — it 301s to /ai-consulting in
  // netlify.toml (no dedicated page exists; a patched shell here would create a
  // duplicate-content page with mismatched meta).
  {
    route: 'internet-connectivity',
    title: 'Internet Connectivity | TrustedNetworx',
    description: 'Enterprise-grade internet connectivity — managed SD-WAN, Starlink satellite broadband, and global IoT SIM solutions to keep your business securely online.',
  },
  {
    route: 'voice-solutions',
    title: 'Voice Solutions — IP PBX & Unified Communications | TrustedNetworx',
    description: 'Enterprise voice communications from TrustedNetworx — cloud-based IP PBX, HD voice, unified communications, voice analytics, and scalable cloud calling for modern business.',
  },
  {
    route: 'mobility-solutions',
    title: 'Mobility Solutions | TrustedNetworx',
    description: 'Enterprise mobility management from TrustedNetworx — MDaaS, IoT connectivity, and unified endpoint management to keep your mobile workforce secure and productive.',
  },
  {
    route: 'tools',
    title: 'Free Telecom Assessment Tools | TrustedNetworx',
    description: 'Interactive tools to evaluate your telecom infrastructure: POTS replacement ROI, copper sunset risk, and business continuity readiness.',
  },
  {
    route: 'tools/pots-roi-calculator',
    title: 'POTS Replacement ROI Calculator | TrustedNetworx',
    description: 'Calculate the cost savings of replacing legacy POTS lines with IP/cellular alternatives. See estimated ROI, break-even timeline, and total cost of ownership.',
  },
  {
    route: 'tools/copper-sunset-risk',
    title: 'Copper Sunset Risk Assessment | TrustedNetworx',
    description: 'Assess your organization\'s exposure to the copper network shutdown. Identify at-risk phone lines, elevator lines, alarm panels, and fax machines.',
  },
  {
    route: 'tools/failover-readiness',
    title: 'Failover Readiness Check | TrustedNetworx',
    description: 'Check how prepared your business is for an internet outage. Score your network resilience and get recommendations for LTE/5G wireless failover.',
  },
  {
    route: 'tools/ai-roi-calculator',
    title: 'AI Implementation ROI Calculator | TrustedNetworx',
    description: 'Estimate the return on investment for AI automation in your business. Compare manual vs. AI-powered workflows across sales, service, and operations.',
  },
  {
    route: 'tools/ai-readiness',
    title: 'AI Readiness Assessment | TrustedNetworx',
    description: 'Evaluate your organization\'s readiness for AI adoption. Score data maturity, operational readiness, and workforce alignment for successful AI deployment.',
  },
  {
    route: 'contact',
    title: 'Contact Us | TrustedNetworx',
    description: 'Get in touch with the TrustedNetworx team to discuss your managed telecom, connectivity, voice, and AI needs.',
  },
];

function patchRoutePages(distDir) {
  const fallbackHtmlPath = path.join(distDir, 'index.html');
  let count = 0;

  for (const { route, title, description } of ROUTE_PAGES) {
    const filePath = path.join(distDir, route, 'index.html');
    ensureHtmlShell(filePath, fallbackHtmlPath);
    patchPage(filePath, {
      title,
      description,
      canonical: `${SITE_URL}/${route}`,
      image: DEFAULT_OG_IMAGE,
      type: 'website',
      jsonLd: [],
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
  console.log('[postbuild] Patched prerendered blog SEO metadata.');
}

main();
