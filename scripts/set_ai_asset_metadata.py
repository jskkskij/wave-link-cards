#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
from PIL import Image
from PIL.PngImagePlugin import PngInfo
import piexif

OWNER = "Maimuna Rahman, Bangladesh"
CO_AUTHORS = "Mohammad Abir Abbas, Asaduzzaman Awal"
AI_NOTE = "AI-generated asset (gemini nano banana + chatgpt)"

TARGETS = [
    "src/assets/affiliate-program.webp",
    "src/assets/Gemini_Generated_Image_56cvgu56cvgu56cv (1).webp",
    "src/assets/Gemini_Generated_Image_qc76e2qc76e2qc76-removebg-preview (1) (1).webp",
]


def save_with_metadata(path: Path) -> None:
    with Image.open(path) as img:
        fmt = (img.format or "").upper()
        info = dict(img.info)

        if fmt == "PNG":
            pnginfo = PngInfo()
            pnginfo.add_text("Artist", OWNER)
            pnginfo.add_text("Model", OWNER)
            pnginfo.add_text("Creator", CO_AUTHORS)
            pnginfo.add_text("ImageDescription", AI_NOTE)
            pnginfo.add_text("Software", "gemini nano banana + chatgpt")
            pnginfo.add_text("Copyright", f"{OWNER}; {CO_AUTHORS}")
            img.save(path, format="PNG", pnginfo=pnginfo, optimize=True)
            return

        if fmt == "WEBP":
            exif_dict = {"0th": {}, "Exif": {}, "1st": {}, "GPS": {}, "Interop": {}, "thumbnail": None}
            exif_dict["0th"][piexif.ImageIFD.Artist] = OWNER.encode("utf-8")
            exif_dict["0th"][piexif.ImageIFD.ImageDescription] = f"{AI_NOTE} | Creators: {CO_AUTHORS}".encode("utf-8")
            exif_dict["0th"][piexif.ImageIFD.Software] = b"gemini nano banana + chatgpt"
            exif_dict["0th"][piexif.ImageIFD.Copyright] = f"{OWNER}; {CO_AUTHORS}".encode("utf-8")
            exif = piexif.dump(exif_dict)
            img.save(
                path,
                format="WEBP",
                quality=82,
                method=6,
                exif=exif,
                lossless=False,
            )
            return

        # Fallback for other formats
        img.save(path)


def main() -> None:
    repo = Path(__file__).resolve().parents[1]
    updated = 0
    for rel in TARGETS:
        p = repo / rel
        if not p.exists():
            print(f"SKIP missing: {rel}")
            continue
        save_with_metadata(p)
        updated += 1
        print(f"UPDATED: {rel}")
    print(f"Total updated: {updated}")


if __name__ == "__main__":
    main()
