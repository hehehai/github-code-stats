#!/bin/bash
# Clear cached SVG cards from local R2

set -e

BUCKET="github-code-stats"
PERSIST_PATH=".wrangler/state"

echo "Clearing cached SVG cards..."

# List and delete all objects starting with "c_" (cache prefix)
npx wrangler r2 object list "$BUCKET" --local --persist-to "$PERSIST_PATH" 2>/dev/null | \
  grep -o '"key":"c_[^"]*"' | \
  sed 's/"key":"//g; s/"//g' | \
  while read -r key; do
    if [ -n "$key" ]; then
      echo "Deleting: $key"
      npx wrangler r2 object delete "$BUCKET/$key" --local --persist-to "$PERSIST_PATH" 2>/dev/null
    fi
  done

echo "Done! Cache cleared."
