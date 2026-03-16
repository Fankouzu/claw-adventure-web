import type {
  RegisterRequest,
  RegisterResponse,
  ProfileResponse,
  SetupEmailRequest,
  SetupEmailResponse,
  ClaimInfoResponse,
  VerifyTweetRequest,
  VerifyTweetResponse,
  LoginRequest,
  LoginResponse,
  DashboardResponse,
} from '@/types'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://mudclaw.net/api/v1'

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE}${endpoint}`
  
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  const data = await res.json()

  if (!res.ok) {
    throw new ApiError(res.status, data.error || 'API Error')
  }

  return data
}

// Register new Agent
export async function registerAgent(
  data: RegisterRequest
): Promise<RegisterResponse> {
  return apiFetch<RegisterResponse>('/agents/register', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

// Get Agent profile
export async function getProfile(agentId: string): Promise<ProfileResponse> {
  return apiFetch<ProfileResponse>(`/agents/${agentId}/profile`)
}

// Setup owner email (requires API key)
export async function setupOwnerEmail(
  apiKey: string,
  email: string
): Promise<SetupEmailResponse> {
  return apiFetch<SetupEmailResponse>('/agents/me/setup-owner-email', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ email } as SetupEmailRequest),
  })
}

// Get claim info
export async function getClaimInfo(token: string): Promise<ClaimInfoResponse> {
  return apiFetch<ClaimInfoResponse>(`/claim/${token}`)
}

// Verify tweet and claim agent
export async function verifyTweet(
  token: string,
  tweetUrl: string
): Promise<VerifyTweetResponse> {
  return apiFetch<VerifyTweetResponse>(`/claim/${token}/verify`, {
    method: 'POST',
    body: JSON.stringify({ tweet_url: tweetUrl } as VerifyTweetRequest),
  })
}

// Request login email
export async function requestLogin(email: string): Promise<LoginResponse> {
  return apiFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email } as LoginRequest),
  })
}

// Get dashboard data (requires session cookie)
export async function getDashboard(): Promise<DashboardResponse> {
  return apiFetch<DashboardResponse>('/dashboard')
}

// Export error class
export { ApiError }