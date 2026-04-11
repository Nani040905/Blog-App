import React from 'react'
import { NavLink } from 'react-router'

function Home() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center space-y-8 mt-[-10vh]">
        <div className="inline-block animate-bounce">
          <span className="bg-blue-100 text-blue-800 text-xs font-bold px-4 py-1.5 rounded-full shadow-sm border border-blue-200 tracking-wider uppercase">
            Platform 2.0 Live
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Share your voice with <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            the world
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Create, read, and share engaging stories on our aesthetically stunning, fully modern platform. Join a growing community of readers and writers today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <NavLink to="/login" className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 font-bold rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all">
            Explore Blogs
          </NavLink>
        </div>
        
        {/* Placeholder skeleton illustration for aesthetic balance */}
        <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto opacity-60">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col gap-3 p-4 bg-white/50 backdrop-blur-sm shadow-sm rounded-xl border border-white">
               <div className="h-24 bg-gray-200/60 rounded-lg animate-pulse"></div>
               <div className="h-4 w-3/4 bg-gray-200/60 rounded animate-pulse"></div>
               <div className="h-3 w-1/2 bg-gray-200/60 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home