// CJK character ranges:
// - CJK Unified Ideographs: U+4E00-U+9FFF (Chinese, Japanese Kanji, Korean Hanja)
// - CJK Unified Ideographs Extension A: U+3400-U+4DBF
// - Hiragana: U+3040-U+309F (Japanese)
// - Katakana: U+30A0-U+30FF (Japanese)
// - Hangul Syllables: U+AC00-U+D7AF (Korean)
// - Hangul Jamo: U+1100-U+11FF (Korean)
// - Bopomofo: U+3100-U+312F (Chinese phonetic)
// - CJK Symbols and Punctuation: U+3000-U+303F
const CJK_REGEX =
  /[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u3100-\u312F\u3400-\u4DBF\u4E00-\u9FFF\uAC00-\uD7AF\u1100-\u11FF]/;

/**
 * Check if a string contains CJK (Chinese, Japanese, Korean) characters
 */
export function containsCjk(text: string): boolean {
  return CJK_REGEX.test(text);
}
