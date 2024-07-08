import React from 'react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
      <a href="/" className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
        Go Back Home
      </a>
    </div>
  )
}
