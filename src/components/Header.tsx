'use client'

import { useState } from 'react'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-google-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">PWA Store</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Cari aplikasi & game"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-google-blue focus:border-google-blue"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-google-blue font-medium">Aplikasi</a>
            <a href="#" className="text-gray-700 hover:text-google-blue font-medium">Game</a>
            <a href="#" className="text-gray-700 hover:text-google-blue font-medium">Film</a>
            <a href="#" className="text-gray-700 hover:text-google-blue font-medium">Buku</a>
          </nav>

          {/* Profile */}
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-12" />
              </svg>
            </button>
            <div className="w-8 h-8 bg-google-blue rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">U</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}