import alchemy from "alchemy";
import { TanStackStart } from "alchemy/cloudflare";
import { config } from "dotenv";

config({ path: "./.env" });
config({ path: "../../apps/web/.env" });

const app = await alchemy("github-code-stats1");

export const web = await TanStackStart("web", {
  cwd: "../../apps/web",
  bindings: {
    CORS_ORIGIN: alchemy.env.CORS_ORIGIN!,
  },
});

console.log(`Web    -> ${web.url}`);

await app.finalize();
