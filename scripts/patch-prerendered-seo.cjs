#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

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
  const patterns = [
    new RegExp(`<script type="application/ld\\+json">[\\s\\S]*?"@type":"${type}"[\\s\\S]*?<\\/script>`, 'g'),
    new RegExp(`<script type="application/ld\\+json">[\\s\\S]*?"@type": "${type}"[\\s\\S]*?<\\/script>`, 'g'),
  ];
  for (const pattern of patterns) html = html.replace(pattern, '');
  return html;
}

function appendStructuredData(html, blocks) {
  const snippet = blocks
    .map((block) => `<script type="application/ld+json">${escapeJsonForScript(block)}</script>`)
    .join('');
  return html.replace('</head>', `${snippet}</head>`);
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

function patchBlogPosts(distDir, srcBlogDir) {
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
    const image = data.image ? `${SITE_URL}${data.image}` : DEFAULT_OG_IMAGE;
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

function main() {
  const root = path.join(__dirname, '..');
  const distDir = path.join(root, 'dist');
  const srcBlogDir = path.join(root, 'src', 'content', 'blog');

  patchBlogIndex(distDir);
  patchBlogPosts(distDir, srcBlogDir);
  console.log('[postbuild] Patched prerendered blog SEO metadata.');
}

main();
