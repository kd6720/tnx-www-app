#!/usr/bin/env python3
import json
import os
import sys
import urllib.request
from pathlib import Path

SITE_URL = "https://trustednetworx.com"
DEFAULT_ENV_PATH = Path.home() / ".hermes" / ".env"


def load_env_value(key: str) -> str | None:
    value = os.getenv(key)
    if value:
        return value.strip()
    if DEFAULT_ENV_PATH.exists():
        for line in DEFAULT_ENV_PATH.read_text().splitlines():
            if line.startswith(f"{key}="):
                return line.split("=", 1)[1].strip()
    return None


def parse_frontmatter(md_path: Path) -> tuple[dict[str, str], str]:
    text = md_path.read_text()
    if not text.startswith('---\n'):
        raise ValueError(f"{md_path} is missing YAML frontmatter")
    parts = text.split('\n---\n', 1)
    if len(parts) != 2:
        raise ValueError(f"{md_path} has malformed YAML frontmatter")
    raw_frontmatter = parts[0].replace('---\n', '', 1)
    body = parts[1].strip()
    data: dict[str, str] = {}
    for line in raw_frontmatter.splitlines():
        if ':' not in line:
            continue
        key, value = line.split(':', 1)
        data[key.strip()] = value.strip().strip('"').strip("'")
    return data, body


def build_payload(slug: str) -> dict[str, str]:
    md_path = Path('/root/trustednetworx/src/content/blog') / f'{slug}.md'
    if not md_path.exists():
        raise FileNotFoundError(f"Blog post not found: {md_path}")
    frontmatter, body = parse_frontmatter(md_path)
    title = frontmatter.get('title', slug.replace('-', ' ').title())
    description = frontmatter.get('description', '')
    image_path = frontmatter.get('image', '')
    blog_url = f"{SITE_URL}/blog/{slug}"
    image_url = f"{SITE_URL}{image_path}" if image_path.startswith('/') else image_path
    excerpt = ' '.join(body.split())[:280].strip()
    caption = (
        f"{title}\n\n"
        f"{description or excerpt}\n\n"
        f"Read more: {blog_url}"
    )
    return {
        'title': title,
        'slug': slug,
        'category': frontmatter.get('category', ''),
        'date': frontmatter.get('date', ''),
        'author': frontmatter.get('author', ''),
        'description': description,
        'excerpt': excerpt,
        'blog_url': blog_url,
        'image_url': image_url,
        'caption': caption,
        'source': 'trustednetworx-blog-cron',
    }


def post_payload(webhook_url: str, payload: dict[str, str]) -> dict:
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(
        webhook_url,
        data=data,
        headers={
            'Content-Type': 'application/json',
            'User-Agent': 'TrustedNetworxBlogWebhook/1.0',
        },
        method='POST',
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        body = resp.read().decode('utf-8', errors='replace')
        return {
            'status': resp.status,
            'body': body[:1000],
        }


def main() -> int:
    if len(sys.argv) < 2:
        print('Usage: send-blog-to-make.py <slug> [--dry-run]', file=sys.stderr)
        return 2
    slug = sys.argv[1].strip()
    dry_run = '--dry-run' in sys.argv[2:]

    payload = build_payload(slug)
    webhook_url = load_env_value('MAKE_FACEBOOK_WEBHOOK_URL')

    if dry_run:
        print(json.dumps({'webhook_configured': bool(webhook_url), 'payload': payload}, indent=2))
        return 0

    if not webhook_url:
        print('MAKE_FACEBOOK_WEBHOOK_URL not configured in environment or ~/.hermes/.env', file=sys.stderr)
        return 1

    result = post_payload(webhook_url, payload)
    print(json.dumps({'ok': True, 'status': result['status'], 'response': result['body']}, indent=2))
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
