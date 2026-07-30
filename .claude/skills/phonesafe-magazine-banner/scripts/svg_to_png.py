#!/usr/bin/env python3
"""
배너 SVG → PNG 변환기 (투명 영역 완전 제거)

사용법:
  python3 svg_to_png.py banner.svg --outdir "매거진 컨텐츠/260702" \
      --date 20260702 --bg 234,242,252

기본 해상도는 하우스 표준인 1672×941(16:9)이다. --width/--height 로 조정 가능.
결과: 휴대폰안심_매거진_배너_YYYYMMDD.png (RGB, 투명 픽셀 0개)
"""
import argparse, io, os, sys


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("svg")
    ap.add_argument("--outdir", required=True)
    ap.add_argument("--date", required=True)
    ap.add_argument("--bg", default="234,242,252",
                    help="투명 픽셀을 채울 배경 RGB. SVG 배경색과 동일하게. 예: 234,242,252")
    ap.add_argument("--width", type=int, default=1672)
    ap.add_argument("--height", type=int, default=941)
    a = ap.parse_args()

    try:
        import cairosvg
        from PIL import Image
    except ImportError:
        sys.exit("cairosvg / pillow 미설치. setup.sh 를 먼저 실행하세요.")

    W, H = a.width, a.height
    bg = tuple(int(x) for x in a.bg.split(","))
    os.makedirs(a.outdir, exist_ok=True)

    png_bytes = cairosvg.svg2png(url=a.svg, output_width=W, output_height=H)
    img = Image.open(io.BytesIO(png_bytes)).convert("RGBA")
    canvas = Image.new("RGB", img.size, bg)
    canvas.paste(img, mask=img.getchannel("A"))
    final = canvas.crop((0, 0, W, H)).convert("RGB")

    path = os.path.join(a.outdir, f"휴대폰안심_매거진_배너_{a.date}.png")
    final.save(path, "PNG")
    print(f"✅ PNG: {path} (RGB, {W}×{H}, 투명 픽셀 0개)")


if __name__ == "__main__":
    main()
