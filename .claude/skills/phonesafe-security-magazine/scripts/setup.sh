#!/usr/bin/env bash
# 로컬 실행에 필요한 파이썬 패키지를 설치한다 (docx/pdf/배너 생성용).
# 최초 1회만 실행하면 된다. 이미 설치되어 있으면 건너뛴다.
set -euo pipefail

PYBIN="${PYTHON:-python3}"

echo "필요한 패키지 확인 중..."
NEED=()
"$PYBIN" -c "import docx"      2>/dev/null || NEED+=("python-docx")
"$PYBIN" -c "import reportlab" 2>/dev/null || NEED+=("reportlab")
"$PYBIN" -c "import cairosvg"  2>/dev/null || NEED+=("cairosvg")
"$PYBIN" -c "import PIL"       2>/dev/null || NEED+=("pillow")

if [ ${#NEED[@]} -eq 0 ]; then
  echo "모든 패키지가 이미 설치되어 있습니다."
  exit 0
fi

echo "설치 대상: ${NEED[*]}"
# PEP 668(externally-managed) 환경 대응: --user 시도 후 실패하면 --break-system-packages
"$PYBIN" -m pip install --user "${NEED[@]}" \
  || "$PYBIN" -m pip install --break-system-packages "${NEED[@]}"

echo "설치 완료."
echo "참고: cairosvg 는 시스템 라이브러리(cairo)가 필요합니다. 배너 PNG 변환이 실패하면 'brew install cairo pango gdk-pixbuf libffi' 를 실행하세요."
