#!/usr/bin/env python3
import json
import os
import sys
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

SITE_URL = "https://trustednetworx.com"
DEFAULT_ENV_PATH = Path.home() / ".hermes" / ".env"
LOG_PATH = Path.home() / ".hermes" / "cron" / "blog-webhook-log.jsonl"
ENV_KEYS = {
    'facebook': 'MAKE_FACEBOOK_WEBHOOK_URL',
    'linkedin': 'MAKE_LINKEDIN_WEBHOOK_URL',
}
CATEGORY_HASHTAGS = {
    "Telecom Modernization": ["#Telecom", "#Connectivity", "#DigitalTransformation"],
    "AI for Business": ["#AI", "#BusinessAutomation", "#Productivity"],
    "Industry Spotlights": ["#Connectivity", "#BusinessTechnology", "#Infrastructure"],
    "Compliance & Regulation": ["#Compliance", "#BusinessContinuity", "#Telecom"],
}


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


def truncate(text: str, limit: int) -> str:
    compact = ' '.join(text.split())
    if len(compact) <= limit:
        return compact
    return compact[: limit - 1].rsplit(' ', 1)[0].rstrip(' ,;:') + '…'


def build_hashtags(category: str, channel: str) -> str:
    base = CATEGORY_HASHTAGS.get(category, ["#BusinessTechnology", "#TrustedNetworx"])
    if channel == 'linkedin':
        tags = base[:2] + ["#TrustedNetworx"]
    else:
        tags = base + ["#TrustedNetworx"]
    deduped = []
    for tag in tags:
        if tag not in deduped:
            deduped.append(tag)
    return ' '.join(deduped)


def build_caption(channel: str, title: str, category: str, description: str, excerpt: str, blog_url: str) -> tuple[str, str]:
    if channel == 'linkedin':
        lead_map = {
            "Telecom Modernization": "A lot of telecom decisions get delayed until they become expensive.",
            "AI for Business": "The best AI projects solve a real operational problem, not just a novelty problem.",
            "Industry Spotlights": "Every industry has different connectivity pressure points.",
            "Compliance & Regulation": "Compliance usually gets harder and more expensive when teams wait too long.",
        }
        lead = lead_map.get(category, "New from TrustedNetworx.")
        body = truncate(description or excerpt, 260)
        hashtags = build_hashtags(category, channel)
        caption = (
            f"{title}\n\n"
            f"{lead}\n"
            f"{body}\n\n"
            f"We put together the full breakdown here: {blog_url}\n\n"
            f"{hashtags}"
        )
        return caption, hashtags

    lead_map = {
        "Telecom Modernization": "Still dealing with legacy telecom decisions?",
        "AI for Business": "Looking for practical AI use cases that actually help the business?",
        "Industry Spotlights": "Different industries hit connectivity problems in different ways.",
        "Compliance & Regulation": "Compliance issues get expensive when they’re handled too late.",
    }
    lead = lead_map.get(category, "New on the TrustedNetworx blog.")
    body = truncate(description or excerpt, 220)
    hashtags = build_hashtags(category, channel)
    caption = (
        f"{title}\n\n"
        f"{lead}\n"
        f"{body}\n\n"
        f"Read the full post: {blog_url}\n\n"
        f"{hashtags}"
    )
    return caption, hashtags


def build_payload(slug: str, channel: str) -> dict[str, str]:
    md_path = Path('/root/trustednetworx/src/content/blog') / f'{slug}.md'
    if not md_path.exists():
        raise FileNotFoundError(f"Blog post not found: {md_path}")
    frontmatter, body = parse_frontmatter(md_path)
    title = frontmatter.get('title', slug.replace('-', ' ').title())
    category = frontmatter.get('category', '')
    description = frontmatter.get('description', '')
    image_path = frontmatter.get('image', '')
    blog_url = f"{SITE_URL}/blog/{slug}"
    image_url = f"{SITE_URL}{image_path}" if image_path.startswith('/') else image_path
    excerpt = truncate(body, 280)
    caption, hashtags = build_caption(channel, title, category, description, excerpt, blog_url)
    return {
        'channel': channel,
        'title': title,
        'slug': slug,
        'category': category,
        'date': frontmatter.get('date', ''),
        'author': frontmatter.get('author', ''),
        'description': description,
        'excerpt': excerpt,
        'blog_url': blog_url,
        'image_url': image_url,
        'caption': caption,
        'hashtags': hashtags,
        'source': 'trustednetworx-blog-cron',
    }


def append_log(entry: dict) -> None:
    LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    with LOG_PATH.open('a') as f:
        f.write(json.dumps(entry) + '\n')


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


def send_for_channel(slug: str, channel: str, dry_run: bool) -> dict:
    env_key = ENV_KEYS[channel]
    webhook_url = load_env_value(env_key)
    payload = build_payload(slug, channel)

    if dry_run:
        return {
            'channel': channel,
            'env_key': env_key,
            'webhook_configured': bool(webhook_url),
            'payload': payload,
        }

    if not webhook_url:
        entry = {
            'timestamp': datetime.now(timezone.utc).isoformat(),
            'slug': slug,
            'channel': channel,
            'ok': False,
            'status': None,
            'error': f'{env_key} not configured',
        }
        append_log(entry)
        return {'channel': channel, 'ok': False, 'skipped': True, 'reason': f'{env_key} not configured'}

    try:
        result = post_payload(webhook_url, payload)
        entry = {
            'timestamp': datetime.now(timezone.utc).isoformat(),
            'slug': slug,
            'channel': channel,
            'ok': True,
            'status': result['status'],
            'response': result['body'],
        }
        append_log(entry)
        return {'channel': channel, 'ok': True, 'status': result['status'], 'response': result['body']}
    except Exception as exc:
        entry = {
            'timestamp': datetime.now(timezone.utc).isoformat(),
            'slug': slug,
            'channel': channel,
            'ok': False,
            'status': getattr(exc, 'code', None),
            'error': str(exc),
        }
        append_log(entry)
        return {'channel': channel, 'ok': False, 'status': getattr(exc, 'code', None), 'error': str(exc)}


def main() -> int:
    if len(sys.argv) < 2:
        print('Usage: send-blog-to-make.py <slug> [facebook|linkedin|all] [--dry-run]', file=sys.stderr)
        return 2

    slug = sys.argv[1].strip()
    target = 'facebook'
    dry_run = False
    for arg in sys.argv[2:]:
        if arg == '--dry-run':
            dry_run = True
        elif arg in ('facebook', 'linkedin', 'all'):
            target = arg
        else:
            print(f'Unknown argument: {arg}', file=sys.stderr)
            return 2

    channels = list(ENV_KEYS) if target == 'all' else [target]
    results = [send_for_channel(slug, channel, dry_run) for channel in channels]

    if dry_run:
        print(json.dumps({'slug': slug, 'target': target, 'results': results}, indent=2))
        return 0

    failures = [r for r in results if r.get('ok') is False and not r.get('skipped')]
    print(json.dumps({'slug': slug, 'target': target, 'results': results}, indent=2))
    return 1 if failures else 0


if __name__ == '__main__':
    raise SystemExit(main())
