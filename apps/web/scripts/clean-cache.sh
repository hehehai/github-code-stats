#!/bin/bash
# Clear cached SVG cards and Emoji assets from local R2

set -e

BUCKET="github-code-stats"
PERSIST_PATH=".wrangler/state"

echo "Clearing cached SVG cards and Emoji assets..."

# List and delete card cache objects and Emoji assets.
npx wrangler r2 object list "$BUCKET" --local --persist-to "$PERSIST_PATH" 2>/dev/null | \
    grep -oE '"key":"(c_[^"]*|emoji/[^"]*)"' | \
  sed 's/"key":"//g; s/"//g' | \
  while read -r key; do
    if [ -n "$key" ]; then
      echo "Deleting: $key"
      npx wrangler r2 object delete "$BUCKET/$key" --local --persist-to "$PERSIST_PATH" 2>/dev/null
    fi
  done

echo "Done! Cache cleared."
