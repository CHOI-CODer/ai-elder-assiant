import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const outputRoot = new URL("../out/", import.meta.url);

test("exports a GitHub Pages-compatible static site", async () => {
  const html = await readFile(new URL("index.html", outputRoot), "utf8");

  assert.match(html, /<html lang="zh-CN">/i);
  assert.match(html, /<title>AI智能医生助手<\/title>/i);
  assert.match(html, /点击进入/);
  assert.match(html, /https:\/\/choi-coder\.github\.io\/ai-for-elder\//);
  assert.match(html, /allow="microphone; autoplay"/);
  assert.doesNotMatch(html, /target="_blank"/);
  assert.match(html, /\/ai-elder-assiant\/_next\//);
  assert.match(html, /\/ai-elder-assiant\/assets\/doctor\.png/);
  assert.match(
    html,
    /property="og:image" content="https:\/\/choi-coder\.github\.io\/ai-elder-assiant\/og\.png"/,
  );
});

test("copies all public assets into the static export", async () => {
  const files = [
    ".nojekyll",
    "favicon.svg",
    "og.png",
    "assets/doctor.png",
    "assets/daughter.png",
    "assets/son.png",
    "assets/medicine-nifedipine.png",
    "assets/medicine-amlodipine.png",
    "assets/medicine-natto.png",
    "assets/microphone.svg",
    "assets/doctor-nav.svg",
    "assets/records-nav.svg",
  ];

  await Promise.all(files.map((file) => access(new URL(file, outputRoot))));
});
