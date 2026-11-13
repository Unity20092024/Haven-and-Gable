"""Derive favicon assets from the exact supplied logo pixels (requires Pillow)."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
logo = Image.open(root / "public/branding/haven-and-gable-logo.png").convert("RGBA")
# The supplied full lockup has no separate emblem file. This rectangle contains
# only the complete greenhouse/leaf emblem, including its finial and baseline.
emblem = logo.crop((100, 115, 505, 555))
emblem.save(root / "public/branding/haven-and-gable-emblem.png")

def icon(size, background):
    canvas = Image.new("RGBA", (size, size), background)
    mark = emblem.copy()
    mark.thumbnail((round(size * 0.88), round(size * 0.88)), Image.Resampling.LANCZOS)
    canvas.alpha_composite(mark, ((size - mark.width) // 2, (size - mark.height) // 2))
    return canvas

favicon = icon(256, (0, 0, 0, 0))
favicon.save(root / "app/icon.png")
favicon.save(root / "app/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
icon(180, (251, 247, 238, 255)).save(root / "app/apple-icon.png")
