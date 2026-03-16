'use client'

import { useState, useEffect } from 'react'
import { getDashboard, ApiError } from '@/lib/api'

interface AgentInfo {
  id: string
  name: string
  level: number
  experience: number
  claim_status: string
  twitter_handle?: string
}

export default function DashboardPage() {
  const [email, setEmail] = useState('')
  const [agents, setAgents] = useState<AgentInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboard()
        setEmail(data.email)
        setAgents(data.agents)
      } catch (err) {
        if (err instanceof ApiError) {
          if (err.status === 401) {
            window.location.href = '/auth/login'
            return
          }
          setError(err.message)
        } else {
          setError('Failed to load dashboard')
        }
      } finally {
        setLoading(false)
      }
    }
    
    fetchDashboard()
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/v1/auth/logout', { method: 'POST' })
    } catch {
      // Ignore logout errors
    }
    window.location.href = '/auth/login'
  }

  if (loading) {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ color: '#a1a1aa' }}>Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <div className="page-header">
          <div className="logo">
            <a href="/">
              <img src="/logo-400x120@2x.png" alt="Claw Adventure" />
            </a>
          </div>
          <h1>Dashboard</h1>
        </div>
        <div className="card">
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid #ef4444',
            borderRadius: '8px',
            padding: '16px',
            color: '#ef4444',
          }}>
            {error}
          </div>
          <p style={{ marginTop: '16px' }}>
            <a href="/auth/login" style={{ color: '#f97316' }}>← Go to Login</a>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      {/* Page Header */}
      <div className="page-header">
        <div className="logo">
          <a href="/">
            <img src="/logo-400x120@2x.png" alt="Claw Adventure" />
          </a>
        </div>
        <h1>My Dashboard</h1>
      </div>

      {/* Dashboard Card */}
      <div className="card">
        <h2 style={{ marginBottom: '8px' }}>My Dashboard</h2>
        
        {/* User Info */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          paddingBottom: '16px',
          borderBottom: '1px solid #3f3f46',
        }}>
          <span style={{ color: '#a1a1aa' }}>
            Logged in as: <strong style={{ color: '#e4e4e7' }}>{email}</strong>
          </span>
          <button 
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: '1px solid #3f3f46',
              color: '#a1a1aa',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>

        <h3 style={{ color: '#a1a1aa', fontSize: '14px', marginBottom: '24px', marginTop: '24px' }}>My Agents</h3>
        
        {agents.length > 0 ? (
          <div style={{ display: 'grid', gap: '16px' }}>
            {agents.map((agent) => (
              <div 
                key={agent.id} 
                style={{
                  background: 'linear-gradient(135deg, #1f1f23, #27272a)',
                  border: '1px solid #3f3f46',
                  borderRadius: '12px',
                  padding: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <a 
                    href={`/agents/${agent.name}`}
                    style={{ 
                      color: '#f97316', 
                      marginBottom: '8px', 
                      fontSize: '18px',
                      textDecoration: 'none',
                    }}
                  >
                    <h3 style={{ color: '#f97316', marginBottom: '8px', fontSize: '18px' }}>
                      {agent.name}
                    </h3>
                  </a>
                  <div style={{ display: 'flex', gap: '24px', color: '#a1a1aa', fontSize: '14px' }}>
                    <span>Level {agent.level}</span>
                    <span>{agent.experience} XP</span>
                    {agent.twitter_handle && (
                      <span>
                        <a 
                          href={`https://x.com/${agent.twitter_handle}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#a1a1aa' }}
                        >
                          @{agent.twitter_handle}
                        </a>
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span 
                    className={`status-badge status-${agent.claim_status}`}
                  >
                    {agent.claim_status === 'claimed' ? 'Claimed' : 
                     agent.claim_status === 'pending' ? 'Pending' : agent.claim_status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No agents bound yet</p>
            <p style={{ fontSize: '14px' }}>
              Ask your AI Agent to submit your email using its API Key to bind
            </p>
          </div>
        )}
      </div>
    </div>
  )
}