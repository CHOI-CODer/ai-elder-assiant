# AI 智能医生助手

为长者设计的响应式静态网页，包括 AI 医生入口、用药提醒、家人关注和语音嘱托交互。手机浏览器全屏显示，电脑浏览器以约 480px 宽的手机界面居中显示。

## 在线访问

[https://choi-coder.github.io/ai-elder-assiant/](https://choi-coder.github.io/ai-elder-assiant/)

## 本地运行

需要 Node.js `>=22.13.0`。

```bash
npm install
npm run dev
```

浏览器访问 `http://localhost:3000/`。

## 构建与测试

```bash
# 原有 Vinext / Sites 构建
npm run build
npm test

# GitHub Pages 静态构建
npm run build:github
npm run test:github

# 代码检查
npm run lint
```

推送到 `main` 分支后，GitHub Actions 会自动构建并发布 GitHub Pages。

## 项目结构

- `app/`：页面、交互和全局样式。
- `public/assets/`：医生、药品、家人头像和导航图标。
- `.github/workflows/deploy-pages.yml`：GitHub Pages 自动部署。
- `.openai/hosting.json`、`vite.config.ts`：保留的 Vinext / Sites 本地构建配置。
- `tests/`：原构建和 GitHub Pages 静态导出测试。

## 功能边界

- 页面状态仅保存在当前浏览会话，刷新后恢复默认。
- 不接入数据库、登录、真实电话、麦克风录音或音频播放。
- “点击进入”会在新标签页打开外部 AI 健康助手。
