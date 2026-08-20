#!/usr/bin/env python3
"""Generate branded 1200x630 Open Graph featured images for blog posts.

Usage:
  python3 scripts/generate-blog-image.py "Blog Post Title" output/path.png
"""

import sys
import os
import math
from PIL import Image, ImageDraw, ImageFont

WIDTH = 1200
HEIGHT = 630

# Brand colors
NAVY_DARK = (15, 23, 42)       # navy-950
NAVY_MID = (30, 41, 59)        # navy-800
BRAND_BLUE = (37, 99, 235)     # brand-600
BRAND_LIGHT = (96, 165, 250)   # brand-400
ACCENT = (6, 182, 212)         # accent-500
WHITE = (255, 255, 255)
WHITE_DIM = (203, 213, 225)    # navy-200
ACCENT_GLOW = (34, 211, 238, 40)  # accent-400 with alpha


def create_gradient(draw, w, h, top_color, bot_color):
    """Draw a vertical gradient."""
    for y in range(h):
        r = int(top_color[0] + (bot_color[0] - top_color[0]) * y / h)
        g = int(top_color[1] + (bot_color[1] - top_color[1]) * y / h)
        b = int(top_color[2] + (bot_color[2] - top_color[2]) * y / h)
        draw.line([(0, y), (w, y)], fill=(r, g, b))


def draw_grid(draw, w, h, color, spacing=40):
    """Draw a subtle grid pattern."""
    for x in range(0, w, spacing):
        draw.line([(x, 0), (x, h)], fill=color, width=1)
    for y in range(0, h, spacing):
        draw.line([(0, y), (w, y)], fill=color, width=1)


def draw_glow_orb(draw, cx, cy, radius, color):
    """Draw a soft glow orb (radial gradient approximation)."""
    for r in range(radius, 0, -1):
        alpha = int(40 * (r / radius))
        fill = (*color[:3], alpha)
        # PIL doesn't support alpha in ImageDraw directly, use a mask approach
        # Instead draw multiple circles with decreasing opacity
        try:
            rgba = (*color[:3], int(255 * (r / radius) * 0.15))
            draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=rgba)
        except (ValueError, TypeError):
            pass


def wrap_text(text, font, max_width, draw):
    """Wrap text to fit within max_width."""
    words = text.split()
    lines = []
    current_line = []
    for word in words:
        test_line = ' '.join(current_line + [word])
        bbox = draw.textbbox((0, 0), test_line, font=font)
        if bbox[2] - bbox[0] <= max_width:
            current_line.append(word)
        else:
            if current_line:
                lines.append(' '.join(current_line))
            current_line = [word]
    if current_line:
        lines.append(' '.join(current_line))
    return lines


def get_font(size):
    """Get a font, falling back to default."""
    font_paths = [
        '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
        '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
        '/System/Library/Fonts/Helvetica.ttc',
    ]
    for path in font_paths:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def get_font_regular(size):
    """Get a regular weight font."""
    font_paths = [
        '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
        '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf',
    ]
    for path in font_paths:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def generate_blog_image(title, output_path):
    """Generate a branded blog featured image."""
    img = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img, 'RGBA')

    # Background gradient: navy-dark → navy-mid with blue accent at bottom
    create_gradient(draw, WIDTH, HEIGHT, NAVY_DARK, NAVY_MID)

    # Diagonal accent gradient overlay (bottom-left to top-right)
    for x in range(WIDTH):
        for y in range(max(0, HEIGHT - x - 200), HEIGHT):
            t = (x + y) / (WIDTH + HEIGHT)
            r = int(BRAND_BLUE[0] * t + ACCENT[0] * (1 - t))
            g = int(BRAND_BLUE[1] * t + ACCENT[1] * (1 - t))
            b = int(BRAND_BLUE[2] * t + ACCENT[2] * (1 - t))
            alpha = int(60 * (1 - abs(y - (HEIGHT - x - 200)) / 200))
            if alpha > 0:
                img.putpixel((x, y), (r, g, b, alpha))

    # Subtle grid
    draw_grid(draw, WIDTH, HEIGHT, (255, 255, 255, 8), spacing=80)

    # Glow orbs for depth
    draw_glow_orb(draw, 200, 180, 150, (37, 99, 235, 60))
    draw_glow_orb(draw, 1050, 480, 120, (6, 182, 212, 40))

    # TrustedNetworx logo text at top
    logo_font = get_font(26)
    draw.text((60, 40), "TrustedNetworx", font=logo_font, fill=BRAND_LIGHT)
    # Small underline accent
    draw.line([(60, 72), (220, 72)], fill=ACCENT, width=3)

    # Blog badge
    badge_font = get_font(16)
    badge_text = "BLOG"
    badge_bbox = draw.textbbox((0, 0), badge_text, font=badge_font)
    badge_w = badge_bbox[2] - badge_bbox[0] + 24
    badge_h = badge_bbox[3] - badge_bbox[1] + 12
    draw.rounded_rectangle(
        [WIDTH - 60 - badge_w, 40, WIDTH - 60, 40 + badge_h],
        radius=10,
        fill=(37, 99, 235, 40),
        outline=(96, 165, 250, 80),
        width=1,
    )
    draw.text(
        (WIDTH - 60 - badge_w + 12, 46),
        badge_text,
        font=badge_font,
        fill=BRAND_LIGHT,
    )

    # Main title (centered)
    title_font = get_font(42)
    max_title_width = 900
    title_lines = wrap_text(title, title_font, max_title_width, draw)

    line_height = 56
    total_title_height = len(title_lines) * line_height
    title_start_y = (HEIGHT - total_title_height) // 2 - 20

    for i, line in enumerate(title_lines):
        bbox = draw.textbbox((0, 0), line, font=title_font)
        line_w = bbox[2] - bbox[0]
        x = (WIDTH - line_w) // 2
        y = title_start_y + i * line_height
        # Subtle text shadow
        draw.text((x + 2, y + 2), line, font=title_font, fill=(0, 0, 0, 60))
        draw.text((x, y), line, font=title_font, fill=WHITE)

    # Decorative line under title
    line_y = title_start_y + total_title_height + 24
    draw.line([(WIDTH // 2 - 80, line_y), (WIDTH // 2 + 80, line_y)], fill=ACCENT, width=2)

    # Subtitle area
    sub_font = get_font_regular(20)
    sub_text = "TrustedNetworx Blog"
    sub_bbox = draw.textbbox((0, 0), sub_text, font=sub_font)
    sub_w = sub_bbox[2] - sub_bbox[0]
    draw.text(((WIDTH - sub_w) // 2, line_y + 30), sub_text, font=sub_font, fill=WHITE_DIM)

    # Bottom accent bar
    draw.rectangle([0, HEIGHT - 4, WIDTH, HEIGHT], fill=BRAND_BLUE)

    # Save (downscale to 1024x576: Linked API rejects the 1200x630 fallback with
    # "unsupportedMimeType", while FAL's 1024x576 PNGs are accepted — verified 2026-08-20)
    os.makedirs(os.path.dirname(output_path) if os.path.dirname(output_path) else '.', exist_ok=True)
    img_rgb = Image.new('RGB', (WIDTH, HEIGHT), NAVY_DARK)
    img_rgb.paste(img, mask=img.split()[3])
    img_rgb = img_rgb.resize((1024, 576), Image.LANCZOS)
    img_rgb.save(output_path, 'PNG', optimize=True)
    print(f"Generated: {output_path}")


if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Usage: python3 scripts/generate-blog-image.py 'Blog Title' output.png")
        sys.exit(1)

    title = sys.argv[1]
    output = sys.argv[2]
    generate_blog_image(title, output)
