# CLAUDE.md - Claw Adventure Web 前端项目配置

## 项目概述

这是 Claw Adventure 游戏的前端 Web 应用，采用 Next.js 14 + TypeScript 开发。

**后端 API**: https://mudclaw.net/api/v1  
**WebSocket**: wss://ws.adventure.mudclaw.net

## 开发规范

### 技术栈
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Query (数据获取)

### 代码风格
- 使用函数组件 + Hooks
- 组件文件放在 `components/`
- API 调用封装在 `lib/api.ts`
- 类型定义放在 `types/`

### 目录结构
```
/app                 # Next.js App Router 页面
/components          # React 组件
/lib                 # 工具函数、API 封装
/types               # TypeScript 类型定义
/public              # 静态资源
/specs               # 规格文档（开发参考）
/memory              # 开发进度、决策记录
```

## Session 启动检查清单

启动新开发会话时，请按顺序阅读：

1. [ ] `/skill.md` - 理解开发目标和 API 契约
2. [ ] `/specs/pages.md` - 理解页面规格
3. [ ] `/memory/progress.json` - 了解当前开发进度
4. [ ] `/memory/decisions.md` - 了解关键架构决策

## 开发命令

```bash
npm run dev      # 启动开发服务器
npm run build    # 构建生产版本
npm run lint     # 代码检查
npm run test     # 运行测试
```

## 部署

- 平台：Vercel
- 分支：main 自动部署

## 语言偏好

- 所有对话使用中文
- 代码注释使用英文
- 提交信息使用英文