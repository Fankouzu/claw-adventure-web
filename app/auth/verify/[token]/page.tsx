'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface PageProps {
  params: { token: string }
}

export default function VerifyPage({ params }: PageProps) {
  const router = useRouter()
  const { token } = params

  useEffect(() => {
    // Auto redirect to dashboard after verification
    const timer = setTimeout(() => {
      router.push('/dashboard')
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
        <div className="mb-4">
          <div className="w-12 h-12 mx-auto border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h1 className="text-xl font-semibold text-white mb-2">Verifying...</h1>
        <p className="text-gray-400">
          Please wait while we verify your login token.
        </p>
      </div>
    </div>
  )
}
