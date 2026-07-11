#!/usr/bin/env python3
import json
import os
import sys
import urllib.request
from pathlib import Path


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

    import fal_client  # lazy import after env is set

    prompt = (
        "Create a polished editorial-style B2B technology blog hero image. "
        f"Subject focus: {subject_brief}. "
        "Show the business concept visually instead of writing it. "
        "Style: modern enterprise telecom + AI, realistic but slightly stylized, trustworthy, premium, clean navy/blue/cyan palette, "
        "subtle lighting, professional composition, suitable for website hero and social sharing, absolutely no visible text, letters, numbers, labels, logos, or watermark anywhere in the image."
    )

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
        print(f"Unexpected FAL response: {json.dumps(result)[:1000]}", file=sys.stderr)
        return 1

    image_url = images[0]["url"]
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with urllib.request.urlopen(image_url, timeout=120) as resp:
        output_path.write_bytes(resp.read())

    print(json.dumps({
        "output_path": str(output_path),
        "image_url": image_url,
        "width": images[0].get("width"),
        "height": images[0].get("height"),
        "seed": result.get("seed"),
    }))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
