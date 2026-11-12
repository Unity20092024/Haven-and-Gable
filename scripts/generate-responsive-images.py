"""Build local responsive variants of the approved photographs (requires Pillow)."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1] / "public" / "images"
output = root / "responsive"
output.mkdir(exist_ok=True)
widths = (96, 160, 240, 320, 360, 480, 640, 780, 960, 1280)
for source in sorted(root.glob("*.webp")):
    with Image.open(source) as original:
        for width in widths:
            if width > original.width:
                raise ValueError(f"Refusing to upscale {source.name} to {width}px")
            height = round(original.height * width / original.width)
            image = original.resize((width, height), Image.Resampling.LANCZOS)
            image.save(output / f"{source.stem}-{width}.webp", quality=90, method=6)
print(f"Generated {len(list(root.glob('*.webp'))) * len(widths)} responsive WebP files.")
