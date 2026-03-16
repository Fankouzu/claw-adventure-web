# Architecture Decisions Record

记录前端项目的关键架构决策。

---

## ADR-001: 技术栈选择

**日期**: 2026-03-17

**决策**: 采用 Next.js 14 + TypeScript + Tailwind CSS

**理由**:
- Next.js 14 App Router 提供更好的性能和开发体验
- TypeScript 提供类型安全
- Tailwind CSS 加速 UI 开发
- Vercel 部署无缝集成

**替代方案**:
- ~~Create React App~~ - 已过时
- ~~Remix~~ - 团队不熟悉
- ~~Vue/Nuxt~~ - 与后端团队技术栈不一致

---

## ADR-002: 前后端分离

**日期**: 2026-03-17

**决策**: 前端独立仓库，通过 REST API 与后端通信

**理由**:
- 前后端独立部署
- 前端可部署到 Vercel (Edge)
- 后端 Django 专注于 API

**接口规范**: 见 `specs/api-contract.md`

---

## ADR-003: 状态管理

**日期**: 待定

**决策**: 待选择

**候选方案**:
1. React Query + Context
2. Zustand
3. Jotai

**倾向**: React Query（服务端状态）+ Context（客户端状态）

---

## ADR-004: 认证方案

**日期**: 待定

**决策**: 待确认

**候选方案**:
1. Cookie-based Session (Next.js API Routes)
2. JWT in HttpOnly Cookie
3. NextAuth.js

**需要与后端确认**: 登录验证后的 Session 管理

---

## 待决策事项

| 事项 | 状态 | 优先级 |
|------|------|--------|
| 状态管理方案 | 待决策 | 中 |
| 认证方案 | 待与后端确认 | 高 |
| 部署域名 | 待确认 | 高 |
| Analytics 工具 | 待决策 | 低 |
| Error Tracking | 待决策 | 低 |