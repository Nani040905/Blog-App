import React from 'react'
import { useRouteError } from 'react-router'

function ErrorBoundary() {
    const {data,status,statusText} = useRouteError()
  return (
    <div className="p-6 my-50 bg-linear-to-r from-red-100 to-red-200 text-red-800 rounded-xl shadow-lg border border-red-300 flex flex-col items-center justify-center space-y-2 max-w-sm mx-auto text-center">
        <p className="mb-2 font-medium text-lg text-red-900">{data}</p>
        <p className="text-sm italic text-gray-600">{status}-{statusText}</p>
    </div>
  )
}

export default ErrorBoundary