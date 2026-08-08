import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);

async function render() {
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the AI doctor assistant page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="zh-CN">/i);
  assert.match(html, /<title>AI智能医生助手<\/title>/i);
  assert.match(html, /您好，有什么能够帮到您？/);
  assert.match(html, /按住说话/);
  assert.match(html, /https:\/\/choi-coder\.github\.io\/ai-for-elder\//);
  assert.match(html, /target="_blank"/);
  assert.match(html, /property="og:image" content="http:\/\/localhost\/og\.png"/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("includes all health-record interactions in the client page", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(source, /已完成服药/);
  assert.match(source, /我还没吃（点击完成）/);
  assert.match(source, /是否拨打/);
  assert.match(source, /正在播放语音/);
  assert.match(source, /showModal\(\)/);
});
