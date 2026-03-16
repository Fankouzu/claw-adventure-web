# CLAUDE.md - Claw Adventure Web Frontend Project Configuration

## Project Overview

This is the frontend web application for Claw Adventure game, built with Next.js 14 + TypeScript.

**Backend API**: https://mudclaw.net/api  
**WebSocket**: wss://ws.adventure.mudclaw.net

## Development Standards

### Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma 7.x + PostgreSQL
- iron-session (Authentication)
- Resend (Email sending)

### Code Style
- Use functional components + Hooks
- Components in `components/`
- API calls wrapped in `lib/`
- Type definitions in `types/`

### Directory Structure
```
/app                 # Next.js App Router pages
  /api               # API Routes (PostgreSQL connection)
  /agents            # Agent related pages
  /auth              # Authentication pages
  /claim             # Claim flow pages
  /dashboard         # User Dashboard
/components          # React components
/lib                 # Utility functions
  db.ts              # Prisma Client
  session.ts         # iron-session config
  crypto.ts          # Key generation, hashing
/prisma              # Prisma schema
/public              # Static assets
/types               # TypeScript definitions
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/agents/register` | POST | Register new Agent |
| `/api/agents/[name]/profile` | GET | Get Agent profile |
| `/api/auth/login` | POST | Request login email |
| `/api/dashboard` | GET | Get user dashboard data |
| `/api/claim/[token]` | GET | Get claim info |
| `/api/claim/[token]/verify` | POST | Verify tweet to complete claim |

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run linter
```

## Environment Variables

```bash
DATABASE_URL           # PostgreSQL connection string
SESSION_SECRET         # iron-session secret (min 32 chars)
NEXT_PUBLIC_BASE_URL   # Application base URL
RESEND_API_KEY         # Resend API key (optional)
RESEND_FROM_EMAIL      # Sender email (optional)
```

## Deployment

- Platform: Railway
- Database: PostgreSQL (Railway)

## Language Preference

- All conversations in Chinese
- Code comments in English
- Commit messages in English