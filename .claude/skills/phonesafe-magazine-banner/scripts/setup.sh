#!/usr/bin/env bash
# 배너 PNG 변환에 필요한 파이썬 패키지를 설치한다. 최초 1회만 실행.
set -euo pipefail
PYBIN="${PYTHON:-python3}"

NEED=()
"$PYBIN" -c "import cairosvg" 2>/dev/null || NEED+=("cairosvg")
"$PYBIN" -c "import PIL"      2>/dev/null || NEED+=("pillow")

if [ ${#NEED[@]} -eq 0 ]; then
  echo "이미 설치되어 있습니다."
  exit 0
fi

echo "설치 대상: ${NEED[*]}"
"$PYBIN" -m pip install --user "${NEED[@]}" \
  || "$PYBIN" -m pip install --break-system-packages "${NEED[@]}"

echo "설치 완료."
echo "참고: cairosvg 는 시스템 라이브러리가 필요합니다. 변환 실패 시 'brew install cairo pango gdk-pixbuf libffi' 를 실행하세요."
