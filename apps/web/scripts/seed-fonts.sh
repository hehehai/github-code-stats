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
curl -sL "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.woff" -o "$FONTS_DIR/inter.woff"
curl -sL "https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-400-normal.woff" -o "$FONTS_DIR/jetbrains-mono.woff"
curl -sL "https://cdn.jsdelivr.net/fontsource/fonts/maple-mono@latest/latin-400-normal.woff" -o "$FONTS_DIR/maple-mono.woff"
curl -sL "https://cdn.jsdelivr.net/fontsource/fonts/roboto@latest/latin-400-normal.woff" -o "$FONTS_DIR/roboto.woff"
curl -sL "https://cdn.jsdelivr.net/fontsource/fonts/noto-sans@latest/latin-400-normal.woff" -o "$FONTS_DIR/noto-sans.woff"
curl -sL "https://cdn.jsdelivr.net/fontsource/fonts/outfit@latest/latin-400-normal.woff" -o "$FONTS_DIR/outfit.woff"
curl -sL "https://cdn.jsdelivr.net/fontsource/fonts/oxygen@latest/latin-400-normal.woff" -o "$FONTS_DIR/oxygen.woff"

# Download CJK fallback font for Asian character support
curl -sL "https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-sc@latest/chinese-simplified-400-normal.woff" -o "$FONTS_DIR/noto-sans-sc.woff"

echo "Seeding local R2..."
npx wrangler r2 object put "$BUCKET/storage/google-sans-flex_5.2.1_latin-400-normal.woff" --file "$FONTS_DIR/google-sans-flex.woff" --local --persist-to "$PERSIST_PATH"
npx wrangler r2 object put "$BUCKET/storage/fira-code_5.2.7_latin-400-normal.woff" --file "$FONTS_DIR/fira-code.woff" --local --persist-to "$PERSIST_PATH"
npx wrangler r2 object put "$BUCKET/storage/inter_5.2.6_latin-400-normal.woff" --file "$FONTS_DIR/inter.woff" --local --persist-to "$PERSIST_PATH"
npx wrangler r2 object put "$BUCKET/storage/jetbrains-mono_5.2.8_latin-400-normal.woff" --file "$FONTS_DIR/jetbrains-mono.woff" --local --persist-to "$PERSIST_PATH"
npx wrangler r2 object put "$BUCKET/storage/maple-mono_5.2.6_latin-400-normal.woff" --file "$FONTS_DIR/maple-mono.woff" --local --persist-to "$PERSIST_PATH"
npx wrangler r2 object put "$BUCKET/storage/roboto_5.2.9_latin-400-normal.woff" --file "$FONTS_DIR/roboto.woff" --local --persist-to "$PERSIST_PATH"
npx wrangler r2 object put "$BUCKET/storage/noto-sans_5.2.9_latin-400-normal.woff" --file "$FONTS_DIR/noto-sans.woff" --local --persist-to "$PERSIST_PATH"
npx wrangler r2 object put "$BUCKET/storage/outfit_5.2.8_latin-400-normal.woff" --file "$FONTS_DIR/outfit.woff" --local --persist-to "$PERSIST_PATH"
npx wrangler r2 object put "$BUCKET/storage/oxygen_5.2.8_latin-400-normal.woff" --file "$FONTS_DIR/oxygen.woff" --local --persist-to "$PERSIST_PATH"

# Seed CJK fallback font
npx wrangler r2 object put "$BUCKET/storage/noto-sans-sc_5.2.8_chinese-simplified-400-normal.woff" --file "$FONTS_DIR/noto-sans-sc.woff" --local --persist-to "$PERSIST_PATH"

echo "Done! Local R2 seeded with fonts."
