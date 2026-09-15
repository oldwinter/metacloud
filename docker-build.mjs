import { spawnSync } from "node:child_process";

// Historical CI entry (`zx docker-build.mjs`). Real image builds live in
// devops/scripts/build.mjs. Hosted runners only need the docs contract.
const result = spawnSync(process.execPath, ["--test", "tests/readme-docs.test.mjs"], {
  stdio: "inherit",
});
process.exit(result.status ?? 1);
