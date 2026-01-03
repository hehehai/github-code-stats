#!/bin/bash
# Download fonts and seed local R2 for development

set -e

FONTS_DIR=".fonts"
BUCKET="github-code-stats"
PERSIST_PATH=".wrangler/state"

mkdir -p "$FONTS_DIR"

echo "Downloading fonts from CDN..."
curl -sL "https://cdn.jsdelivr.net/fontsource/fonts/google-sans-flex@latest/latin-400-normal.woff" -o "$FONTS_DIR/google-sans-flex.woff"
curl -sL "https://cdn.jsdelivr.net/fontsource/fonts/fira-code@latest/latin-400-normal.woff" -o "$FONTS_DIR/fira-code.woff"
curl -sL "https://cdn.jsdelivr.net/fontsource/fonts/geist-mono@latest/latin-400-normal.woff" -o "$FONTS_DIR/geist-mono.woff"
curl -sL "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.woff" -o "$FONTS_DIR/inter.woff"
curl -sL "https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-400-normal.woff" -o "$FONTS_DIR/jetbrains-mono.woff"
curl -sL "https://cdn.jsdelivr.net/fontsource/fonts/maple-mono@latest/latin-400-normal.woff" -o "$FONTS_DIR/maple-mono.woff"

echo "Seeding local R2..."
npx wrangler r2 object put "$BUCKET/storage/google-sans-flex_5.2.1_latin-400-normal.woff" --file "$FONTS_DIR/google-sans-flex.woff" --local --persist-to "$PERSIST_PATH"
npx wrangler r2 object put "$BUCKET/storage/fira-code_5.2.7_latin-400-normal.woff" --file "$FONTS_DIR/fira-code.woff" --local --persist-to "$PERSIST_PATH"
npx wrangler r2 object put "$BUCKET/storage/geist-mono_5.2.7_latin-400-normal.woff" --file "$FONTS_DIR/geist-mono.woff" --local --persist-to "$PERSIST_PATH"
npx wrangler r2 object put "$BUCKET/storage/inter_5.2.6_latin-400-normal.woff" --file "$FONTS_DIR/inter.woff" --local --persist-to "$PERSIST_PATH"
npx wrangler r2 object put "$BUCKET/storage/jetbrains-mono_5.2.8_latin-400-normal.woff" --file "$FONTS_DIR/jetbrains-mono.woff" --local --persist-to "$PERSIST_PATH"
npx wrangler r2 object put "$BUCKET/storage/maple-mono_5.2.6_latin-400-normal.woff" --file "$FONTS_DIR/maple-mono.woff" --local --persist-to "$PERSIST_PATH"

echo "Done! Local R2 seeded with fonts."
