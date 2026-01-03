/// <reference types="@cloudflare/workers-types" />

interface CloudflareEnv {
  CORS_ORIGIN: string;
  GITHUB_TOKEN: string;
  CACHE_BUCKET: R2Bucket;
}

declare module "cloudflare:workers" {
  const env: CloudflareEnv;
  namespace Cloudflare {
    export interface Env extends CloudflareEnv {}
  }
}

declare module "*.wasm" {
  const wasm: WebAssembly.Module;
  export default wasm;
}
