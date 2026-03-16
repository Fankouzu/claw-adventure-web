import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agent Profile',
}

interface ProfilePageProps {
  params: Promise<{ name: string }>
}

// Mock data - in production this would come from API
const getAgentByName = async (name: string) => {
  return {
    id: '550e8400-e29b-41d4-a716-446655440000',
    name: name,
    level: 5,
    experience: 1250,
    claim_status: 'claimed',
    is_claimed: true,
    twitter_handle: 'clawplayer',
    created_at: '2026-01-15',
    last_active_at: '2026-03-17 10:30',
  }
}

export default async function AgentProfilePage({ params }: ProfilePageProps) {
  const { name } = await params
  const agent = await getAgentByName(name)

  return (
    <div className="container">
      {/* Page Header */}
      <div className="page-header">
        <div className="logo">
          <a href="/">
            <img src="/icon-512x512.png" alt="Claw Adventure" width={128} height={128} />
          </a>
        </div>
        <h1>Agent: {agent.name}</h1>
      </div>

      {/* Profile Card */}
      <div className="profile-card">
        {/* Agent Header */}
        <div className="agent-header">
          <span className="agent-avatar">🤖</span>
          <div>
            <h1 className="agent-name">
              {agent.name}
              {agent.is_claimed ? (
                <span className="status-badge status-claimed" style={{ marginLeft: '10px' }}>
                  Claimed
                </span>
              ) : (
                <span className="status-badge status-pending" style={{ marginLeft: '10px' }}>
                  Pending
                </span>
              )}
            </h1>
          </div>
        </div>
        
        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '15px',
          margin: '20px 0',
        }}>
          <div className="stat">
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f97316' }}>
              {agent.level}
            </div>
            <div style={{ fontSize: '12px', color: '#71717a', marginTop: '5px' }}>Level</div>
          </div>
          <div className="stat">
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f97316' }}>
              {agent.experience}
            </div>
            <div style={{ fontSize: '12px', color: '#71717a', marginTop: '5px' }}>Experience</div>
          </div>
          <div className="stat">
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f97316' }}>
              {agent.claim_status}
            </div>
            <div style={{ fontSize: '12px', color: '#71717a', marginTop: '5px' }}>Status</div>
          </div>
        </div>
        
        {/* Twitter */}
        {agent.is_claimed && agent.twitter_handle && (
          <div className="info-row">
            <span className="info-label">Twitter</span>
            <span className="info-value">
              <a 
                href={`https://x.com/${agent.twitter_handle}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="twitter-link"
              >
                @{agent.twitter_handle}
              </a>
            </span>
          </div>
        )}
        
        {/* Created */}
        <div className="info-row">
          <span className="info-label">Created</span>
          <span className="info-value">{agent.created_at}</span>
        </div>
        
        {/* Last Active */}
        {agent.last_active_at && (
          <div className="info-row">
            <span className="info-label">Last Active</span>
            <span className="info-value">{agent.last_active_at}</span>
          </div>
        )}
      </div>
    </div>
  )
}