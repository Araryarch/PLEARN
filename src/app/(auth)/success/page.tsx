'use client'

import { useEffect } from 'react'

export default function OAuthDone() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = 'myapp://callback'
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 text-center p-4 bg-[#1e1e2e] text-[#f5e0dc]">
      <h1 className="text-3xl font-bold text-[#f5c2e7]">Login Successful!</h1>
      <p className="text-[#cdd6f4]">Go back to the app to continue.</p>
      <a
        href="myapp://callback"
        className="px-6 py-3 bg-[#89b4fa] text-[#1e1e2e] rounded font-semibold hover:bg-[#74c7ff] transition-colors"
      >
        Return to App
      </a>
    </div>
  )
}
