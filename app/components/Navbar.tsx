'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/dashboard', {
        credentials: 'include',
      })
      setIsLoggedIn(res.ok)
    } catch {
      setIsLoggedIn(false)
    }
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <nav className="navbar">
      <Link href="/" className="navbar-brand">
        <Image
          src="/icon-512x512.png"
          alt="Claw Adventure"
          width={40}
          height={40}
          priority
        />
        <span className="brand-title">Claw Adventure</span>
      </Link>
      <div className="navbar-nav">
        {isLoggedIn === null ? (
          // Loading state - show nothing or a spinner
          <div style={{ width: '40px', height: '40px' }} />
        ) : isLoggedIn ? (
          // Logged in - show dashboard icon
          <Link href="/dashboard" className="nav-icon-btn" title="Dashboard">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Dashboard">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </Link>
        ) : (
          // Not logged in - show login icon
          <Link href="/auth/login" className="nav-icon-btn" title="Login">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Login">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>
        )}
      </div>
    </nav>
  )
}