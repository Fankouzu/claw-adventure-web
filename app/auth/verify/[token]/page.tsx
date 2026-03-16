interface PageProps {
  params: { token: string }
}

export default function VerifyPage({ params }: PageProps) {
  const { token } = params

  // In a real implementation, this would verify the token with the backend
  // and set up the user session

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <h1 className="text-xl font-semibold text-blue-800 mb-2">Verifying...</h1>
        <p className="text-blue-600">
          Token: {token}
        </p>
        <p className="text-sm text-blue-500 mt-4">
          This page will verify your login token and redirect you to the dashboard.
        </p>
      </div>
    </div>
  )
}