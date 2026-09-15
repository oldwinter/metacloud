import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const readme = readFileSync(join(root, "README.md"), "utf8");

describe("README project docs entry", () => {
  it("points section 1.2 at the in-repo uni-tools README", () => {
    const section = readme.split("## 1.3")[0];
    assert.match(section, /## 1\.2 项目文档/);
    assert.match(section, /\[uni-tools\/README\.md\]\(uni-tools\/README\.md\)/);
    assert.doesNotMatch(section, /\[\[uni-tools\/README\]\]/);
    assert.doesNotMatch(section, /# haha #牛批/);
  });

  it("uses the real GitHub repo path for github.dev", () => {
    assert.match(readme, /https:\/\/github\.dev\/oldwinter\/metacloud/);
    assert.doesNotMatch(readme, /github\.dev\/oldwinter\/MetaCloud/);
  });

  it("does not run global zx or a missing docker-build.mjs in CI", () => {
    const workflow = readFileSync(join(root, ".github/workflows/main.yml"), "utf8");
    assert.match(workflow, /node --test tests\/readme-docs\.test\.mjs/);
    assert.doesNotMatch(workflow, /^\s+npm install -g zx/m);
    assert.doesNotMatch(workflow, /^\s+zx docker-build\.mjs/m);
  });
});
