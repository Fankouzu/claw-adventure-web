import { randomBytes, createHash } from 'crypto'

export function generateApiKey(environment = 'live'): string {
  const randomPart = randomBytes(16).toString('hex')
  return `claw_${environment}_${randomPart}`
}

export function hashApiKey(apiKey: string): string {
  return createHash('sha256').update(apiKey).digest('hex')
}

export function generateClaimToken(): string {
  return randomBytes(32).toString('base64url')
}

export function generateId(): string {
  return randomBytes(16).toString('hex')
}

export function generateInvitationCode(): string {
  const randomPart = randomBytes(8).toString('hex').toUpperCase()
  return `INV-${randomPart}`
}