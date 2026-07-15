#!/usr/bin/env python3
import hashlib
import json
import os
import sys
import urllib.request
from pathlib import Path
from typing import Iterable

from PIL import Image

RECENT_IMAGE_COUNT = 6
PHASH_THRESHOLD = 8
MAX_ATTEMPTS = 3


def load_fal_key() -> str | None:
    key = os.getenv("FAL_KEY") or os.getenv("FAL_KEY_ID")
    if key:
        return key

    env_path = Path.home() / ".hermes" / ".env"
    if env_path.exists():
        for line in env_path.read_text().splitlines():
            if line.startswith("FAL_KEY="):
                return line.split("=", 1)[1].strip()
    return None


def average_hash(path: Path, size: int = 8) -> str:
    with Image.open(path) as img:
        gray = img.convert("L").resize((size, size))
        pixels = list(gray.tobytes())
    avg = sum(pixels) / len(pixels)
    bits = ''.join('1' if px >= avg else '0' for px in pixels)
    return f'{int(bits, 2):0{size * size // 4}x}'


def hamming_distance(hex_a: str, hex_b: str) -> int:
    return (int(hex_a, 16) ^ int(hex_b, 16)).bit_count()


def sha256_file(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def recent_reference_images(output_path: Path, count: int = RECENT_IMAGE_COUNT) -> list[Path]:
    if not output_path.parent.exists():
        return []
    images = [
        p for p in output_path.parent.glob('*.png')
        if p.is_file() and p.name != output_path.name
    ]
    images.sort(key=lambda p: p.stat().st_mtime, reverse=True)
    return images[:count]


def compare_against_recent(path: Path, references: Iterable[Path]) -> dict:
    target_hash = average_hash(path)
    target_sha = sha256_file(path)
    comparisons = []
    for ref in references:
        try:
            ref_hash = average_hash(ref)
            comparisons.append({
                'file': ref.name,
                'phash': ref_hash,
                'distance': hamming_distance(target_hash, ref_hash),
                'sha256': sha256_file(ref),
            })
        except Exception as exc:
            comparisons.append({
                'file': ref.name,
                'error': str(exc),
            })
    exact_match = next((c for c in comparisons if c.get('sha256') == target_sha), None)
    comparable = [c for c in comparisons if 'distance' in c]
    nearest = min(comparable, key=lambda c: c['distance']) if comparable else None
    too_similar = bool(exact_match) or bool(nearest and nearest['distance'] <= PHASH_THRESHOLD)
    return {
        'target_phash': target_hash,
        'target_sha256': target_sha,
        'nearest_match': nearest,
        'exact_match': exact_match,
        'comparisons': comparisons,
        'too_similar': too_similar,
    }


def build_prompt(title: str, subject_brief: str, attempt: int) -> str:
    base = (
        "Create a polished editorial-style B2B technology blog hero image. "
        f"Article title: {title}. "
        f"Subject focus: {subject_brief}. "
        "Represent the actual topic visually instead of using a generic telecom or AI background. "
        "Show a concrete scene, environment, equipment, and business context that match the article subject. "
        "Style: modern enterprise, realistic but slightly stylized, trustworthy, premium, clean navy/blue/cyan palette where appropriate, "
        "subtle lighting, professional composition, suitable for website hero and social sharing, and absolutely no visible text, letters, numbers, labels, logos, signs, posters, UI labels, title overlays, or watermark anywhere in the image."
    )
    if attempt == 1:
        return base
    return (
        base
        + " Previous attempt was too visually similar to recent blog images. "
        + "Use a distinctly different primary subject, scene composition, camera angle, setting, and visual motif. "
        + "Avoid generic glowing network maps, abstract circuit-board backdrops, or repeated server-room scenes unless the article explicitly requires them. "
        + "Avoid all readable text, signage, overlays, labels, and UI screens with words or numbers."
    )


def generate_image(prompt: str, output_path: Path) -> dict:
    import fal_client  # lazy import after env is set

    result = fal_client.subscribe(
        "fal-ai/flux-2/klein/9b",
        arguments={
            "prompt": prompt,
            "image_size": "landscape_16_9",
            "num_inference_steps": 4,
            "output_format": "png",
            "enable_safety_checker": False,
        },
    )
    images = result.get("images") or []
    if not images:
        raise RuntimeError(f"Unexpected FAL response: {json.dumps(result)[:1000]}")

    image_url = images[0]["url"]
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with urllib.request.urlopen(image_url, timeout=120) as resp:
        output_path.write_bytes(resp.read())

    return {
        'image_url': image_url,
        'width': images[0].get('width'),
        'height': images[0].get('height'),
        'seed': result.get('seed'),
    }


def main() -> int:
    if len(sys.argv) < 3:
        print("Usage: generate-blog-image-fal.py <title> <output_path> [subject_brief]", file=sys.stderr)
        return 2

    title = sys.argv[1].strip()
    output_path = Path(sys.argv[2]).expanduser()
    subject_brief = sys.argv[3].strip() if len(sys.argv) > 3 else title

    fal_key = load_fal_key()
    if not fal_key:
        print("FAL_KEY not found in environment or ~/.hermes/.env", file=sys.stderr)
        return 1

    os.environ["FAL_KEY"] = fal_key
    references = recent_reference_images(output_path)
    attempts = []

    for attempt in range(1, MAX_ATTEMPTS + 1):
        prompt = build_prompt(title, subject_brief, attempt)
        try:
            gen = generate_image(prompt, output_path)
        except Exception as exc:
            print(str(exc), file=sys.stderr)
            return 1

        comparison = compare_against_recent(output_path, references)
        attempts.append({
            'attempt': attempt,
            'prompt': prompt,
            'nearest_match': comparison['nearest_match'],
            'too_similar': comparison['too_similar'],
        })
        if not comparison['too_similar']:
            print(json.dumps({
                'output_path': str(output_path),
                'image_url': gen['image_url'],
                'width': gen['width'],
                'height': gen['height'],
                'seed': gen['seed'],
                'phash': comparison['target_phash'],
                'sha256': comparison['target_sha256'],
                'nearest_match': comparison['nearest_match'],
                'attempts': attempts,
            }))
            return 0

    nearest = attempts[-1].get('nearest_match')
    print(
        f"Generated image remained too similar after {MAX_ATTEMPTS} attempts. "
        f"Nearest recent match: {nearest}",
        file=sys.stderr,
    )
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
