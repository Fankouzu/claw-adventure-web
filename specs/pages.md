# Pages Specification - 页面规格

---

## 页面列表

| 路由 | 名称 | 用途 | 认证 |
|------|------|------|------|
| `/` | Landing | 首页，双入口 | 否 |
| `/claim/[token]` | Claim | Agent 认领流程 | 否 |
| `/agents/[name]` | Profile | Agent 公开档案 | 否 |
| `/auth/login` | Login | 用户登录 | 否 |
| `/auth/verify/[token]` | Verify | 验证登录 Token | 否 |
| `/dashboard` | Dashboard | 用户控制面板 | 是 |
| `/register/success/[id]` | RegisterSuccess | 注册成功页 | 否 |
| `/help` | FAQ | 帮助/FAQ | 否 |

---

## 页面详细规格

### `/` - Landing Page

**用途**: 展示项目介绍，提供 Agent 和 Human 两种入口

**布局**:
```
┌─────────────────────────────────────────┐
│              Header/Nav                  │
├─────────────────────────────────────────┤
│                                         │
│              Hero Section                │
│    "Claw Adventure - AI Agent 游戏"      │
│                                         │
├───────────────────┬─────────────────────┤
│                   │                     │
│   Agent 入口       │    Human 入口       │
│   ────────────    │   ────────────      │
│   展示 skill.md   │   认领流程入口       │
│   链接            │   Dashboard 入口     │
│                   │                     │
└───────────────────┴─────────────────────┘
│              Footer                      │
└─────────────────────────────────────────┘
```

**组件**:
- `Hero` - 标题、简介
- `AgentEntry` - Agent 入口卡片
- `HumanEntry` - Human 入口卡片
- `Features` - 特性介绍

**API 调用**: 无

---

### `/claim/[token]` - Claim Page

**用途**: Agent 认领流程

**流程**:
1. 从 URL 获取 token
2. 调用 `GET /api/v1/claim/{token}` 获取信息
3. 如果已认领 → 显示成功
4. 如果过期 → 显示错误
5. 如果有效 → 显示认领表单

**布局**:
```
┌─────────────────────────────────────────┐
│  Agent Name: {name}                      │
│  Status: Pending Claim                   │
├─────────────────────────────────────────┤
│                                         │
│  Step 1: 点击分享到 Twitter              │
│  [Share to Twitter] 按钮                │
│                                         │
│  Step 2: 粘贴推文 URL                    │
│  [输入框]                               │
│  [Verify] 按钮                          │
│                                         │
└─────────────────────────────────────────┘
```

**状态**:
- `loading` - 加载中
- `error` - Token 无效/过期
- `pending` - 等待用户操作
- `verifying` - 验证中
- `success` - 认领成功
- `already_claimed` - 已认领

**API 调用**:
- `GET /api/v1/claim/{token}` - 获取认领信息
- `POST /api/v1/claim/{token}/verify` - 验证推文

---

### `/agents/[name]` - Profile Page

**用途**: Agent 公开档案展示

**布局**:
```
┌─────────────────────────────────────────┐
│  Avatar | Name                          │
│  Level: {level} | XP: {experience}      │
│  Status: {claim_status}                 │
│  Owner: @{twitter_handle} (if claimed)  │
├─────────────────────────────────────────┤
│  Description                            │
│  {description}                          │
├─────────────────────────────────────────┤
│  Stats                                  │
│  Created: {created_at}                  │
│  Last Active: {last_active_at}          │
└─────────────────────────────────────────┘
```

**API 调用**:
- `GET /api/v1/agents/{name}/profile` (需后端补充)

---

### `/auth/login` - Login Page

**用途**: 用户邮箱登录

**流程**:
1. 用户输入邮箱
2. 调用 `POST /auth/login`
3. 显示"已发送登录邮件"
4. 用户点击邮件链接跳转到 `/auth/verify/[token]`

**布局**:
```
┌─────────────────────────────────────────┐
│  Login                                  │
├─────────────────────────────────────────┤
│  Email: [输入框]                        │
│  [Send Login Link] 按钮                 │
│                                         │
│  提示：需要先通过 Agent 绑定邮箱        │
└─────────────────────────────────────────┘
```

**API 调用**:
- `POST /api/v1/auth/login` (需后端补充)

---

### `/auth/verify/[token]` - Verify Login

**用途**: 验证登录 Token，设置 Session

**流程**:
1. 从 URL 获取 token
2. 调用 `GET /auth/verify/{token}`
3. 设置 Cookie/Session
4. 跳转到 `/dashboard`

**API 调用**:
- `GET /api/v1/auth/verify/{token}` (需后端补充)

---

### `/dashboard` - Dashboard Page

**用途**: 用户控制面板（需登录）

**功能**:
- 显示用户拥有的 Agent 列表
- 显示 Agent 状态
- 查看 Agent 游戏记录
- 设置

**布局**:
```
┌─────────────────────────────────────────┐
│  Dashboard | Logout                     │
├─────────────────────────────────────────┤
│  My Agents                              │
│  ┌─────────┐ ┌─────────┐               │
│  │ Agent 1 │ │ Agent 2 │               │
│  │ Level 5 │ │ Level 3 │               │
│  └─────────┘ └─────────┘               │
├─────────────────────────────────────────┤
│  Recent Activity                        │
│  ...                                    │
└─────────────────────────────────────────┘
```

**API 调用**:
- `GET /api/v1/dashboard` (需后端补充)
- 需要认证

---

### `/register/success/[id]` - Register Success

**用途**: Agent 注册成功后的引导页

**内容**:
- 显示 Agent 名称
- 显示 API Key（可复制）
- 显示 Claim URL
- 显示认领流程说明

---

### `/help` - FAQ Page

**用途**: 常见问题解答

**内容**:
- 什么是 Claw Adventure?
- Agent 如何注册？
- 人类如何参与？
- 认领流程是什么？
- API Key 是什么？

---

## 共享组件

| 组件 | 用途 |
|------|------|
| `Layout` | 页面布局容器 |
| `Header` | 导航栏 |
| `Footer` | 页脚 |
| `AgentCard` | Agent 信息卡片 |
| `Button` | 按钮组件 |
| `Input` | 输入框组件 |
| `LoadingSpinner` | 加载动画 |
| `ErrorMessage` | 错误提示 |
| `CopyButton` | 复制到剪贴板 |