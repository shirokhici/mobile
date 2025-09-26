'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import AppCard from '@/components/AppCard'
import CustomInstallButton from '@/components/CustomInstallButton'

export default function Home() {
  const [showInstallBanner, setShowInstallBanner] = useState(false)

  useEffect(() => {
    // Show install banner after 3 seconds if PWA is not installed
    const timer = setTimeout(() => {
      if (!window.matchMedia('(display-mode: standalone)').matches) {
        setShowInstallBanner(true)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // Sample app data - in real app this would come from API
  const appData = {
    name: "PWA Store App",
    developer: "PWA Developer",
    rating: 4.5,
    downloads: "10K+ unduhan",
    description: "Aplikasi Progressive Web App (PWA) yang memberikan pengalaman instalasi mirip Google Play Store. Aplikasi ini mendemonstrasikan bagaimana PWA dapat diinstall dengan mudah dan memberikan pengalaman native-like kepada pengguna. Fitur-fitur termasuk offline support, push notifications, dan instalasi yang seamless di berbagai platform.",
    screenshots: [
      "/screenshot1.jpg",
      "/screenshot2.jpg", 
      "/screenshot3.jpg"
    ],
    icon: "/icon-192x192.png",
    category: "Produktivitas",
    size: "2.5 MB",
    version: "1.0.0",
    lastUpdated: "15 Des 2024"
  }



  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Install Banner */}
      {showInstallBanner && (
        <div className="bg-google-blue text-white p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/icon-192x192.png" alt="PWA Icon" className="w-10 h-10 rounded-lg" />
              <div>
                <p className="font-medium">Install PWA Store App</p>
                <p className="text-sm opacity-90">Dapatkan pengalaman yang lebih baik dengan menginstall aplikasi</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  const pwaInstall = document.querySelector('pwa-install') as any
                  if (pwaInstall) {
                    pwaInstall.showDialog()
                  }
                }}
                className="bg-white text-google-blue px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Install
              </button>
              <button
                onClick={() => setShowInstallBanner(false)}
                className="text-white hover:text-gray-200 p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <a href="#" className="hover:text-google-blue">Aplikasi</a>
          <span>›</span>
          <a href="#" className="hover:text-google-blue">Produktivitas</a>
          <span>›</span>
          <span className="text-gray-900">{appData.name}</span>
        </nav>

        {/* App Card */}
        <AppCard {...appData} />

        {/* Related Apps Section */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-6">Aplikasi serupa</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-google p-4 hover:shadow-google-hover transition-shadow">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-google-blue to-google-green rounded-xl"></div>
                  <div>
                    <h3 className="font-medium">Sample App {item}</h3>
                    <p className="text-sm text-gray-600">Developer Name</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm">4.{item}</span>
                    <div className="flex text-yellow-400">
                      {'★'.repeat(4)}☆
                    </div>
                  </div>
                  <button className="text-google-blue font-medium text-sm hover:underline">
                    Install
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* PWA Install Component */}
      <CustomInstallButton 
        variant="secondary" 
        size="md"
        onInstallSuccess={() => setShowInstallBanner(false)}
      >
        Install Sekarang
      </CustomInstallButton>
    </div>
  )
}