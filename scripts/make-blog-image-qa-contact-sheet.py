#!/usr/bin/env python3
import sys
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw

PANEL_W = 640
PANEL_H = 360
HEADER_H = 36
BG = (10, 20, 40)
FG = (255, 255, 255)
ACCENT = (60, 120, 220)


def fit_panel(img: Image.Image) -> Image.Image:
    fitted = ImageOps.fit(img.convert('RGB'), (PANEL_W, PANEL_H), method=Image.Resampling.LANCZOS)
    return fitted


def label_for(path: Path, is_candidate: bool) -> str:
    name = path.stem.replace('-', ' ')
    prefix = 'CANDIDATE' if is_candidate else 'RECENT'
    return f'{prefix}: {name[:80]}'


def main() -> int:
    if len(sys.argv) < 4:
        print('Usage: make-blog-image-qa-contact-sheet.py <candidate> <output> <recent1> [recent2 ...]', file=sys.stderr)
        return 2

    candidate = Path(sys.argv[1]).expanduser()
    output = Path(sys.argv[2]).expanduser()
    recent = [Path(p).expanduser() for p in sys.argv[3:]]
    if not candidate.exists():
        print(f'Missing candidate image: {candidate}', file=sys.stderr)
        return 1
    missing = [str(p) for p in recent if not p.exists()]
    if missing:
        print(f'Missing recent images: {missing}', file=sys.stderr)
        return 1

    images = [candidate] + recent
    canvas = Image.new('RGB', (PANEL_W, len(images) * (HEADER_H + PANEL_H)), BG)
    draw = ImageDraw.Draw(canvas)

    for idx, path in enumerate(images):
        y = idx * (HEADER_H + PANEL_H)
        draw.rectangle((0, y, PANEL_W, y + HEADER_H), fill=ACCENT)
        draw.text((12, y + 10), label_for(path, idx == 0), fill=FG)
        with Image.open(path) as img:
            panel = fit_panel(img)
        canvas.paste(panel, (0, y + HEADER_H))

    output.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(output)
    print(output)
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
