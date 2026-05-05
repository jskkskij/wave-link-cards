#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

count=0
while IFS= read -r file; do
  out="${file%.*}.webp"
  ffmpeg -nostdin -hide_banner -loglevel error -y -i "$file" "$out"
  count=$((count + 1))
done < <(rg --files -g '*.png' -g '*.jpg' -g '*.jpeg')

echo "Converted $count images to WebP."
