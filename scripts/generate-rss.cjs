#!/usr/bin/env node
/**
 * Generate RSS feed from blog posts.
 * Output: public/rss.xml — served at https://trustednetworx.com/rss.xml
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://trustednetworx.com';

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

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');
const posts = fs.readdirSync(blogDir)
  .filter(f => f.endsWith('.md'))
  .map(f => {
    const slug = f.replace(/\.md$/, '');
    const raw = fs.readFileSync(path.join(blogDir, f), 'utf8');
    const { data } = parseFrontmatter(raw);
    return { slug, title: data.title || slug, date: data.date, description: data.description || '', category: data.category || '', image: data.image || null };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

const items = posts.map(p =>
`  <item>
    <title>${esc(p.title)}</title>
    <link>${SITE_URL}/blog/${p.slug}</link>
    <guid isPermaLink="true">${SITE_URL}/blog/${p.slug}</guid>
    <pubDate>${new Date(p.date).toUTCString()}</pubDate>
    <description>${esc(p.description)}</description>
    <category>${esc(p.category)}</category>${p.image ? `\n    <enclosure url="${SITE_URL}${p.image}" type="image/png"/>` : ''}
  </item>`
).join('\n');

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>TrustedNetworx Blog</title>
  <link>${SITE_URL}/blog</link>
  <description>Practical insights on telecom modernization, AI for business, compliance, and connectivity.</description>
  <language>en-us</language>
  <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
</channel>
</rss>`;

fs.writeFileSync(path.join(__dirname, '..', 'public', 'rss.xml'), rss, 'utf8');
console.log(`RSS feed: ${posts.length} posts → public/rss.xml`);
