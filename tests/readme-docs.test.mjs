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

  it("installs zx into a writable prefix so hosted CI is not 243", () => {
    const npmrc = readFileSync(join(root, ".npmrc"), "utf8");
    assert.match(npmrc, /^prefix=\.npm-global$/m);
  });

  it("keeps the historical docker-build entry the starter workflow calls", () => {
    const script = readFileSync(join(root, "docker-build.mjs"), "utf8");
    assert.match(script, /"--test", "tests\/readme-docs\.test\.mjs"/);
    assert.doesNotMatch(script, /docker build/);
  });
});
