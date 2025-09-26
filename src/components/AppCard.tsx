'use client'

import { useState } from 'react'
import CustomInstallButton from './CustomInstallButton'

interface AppCardProps {
  name: string
  developer: string
  rating: number
  downloads: string
  description: string
  screenshots: string[]
  icon: string
  category: string
  size: string
  version: string
  lastUpdated: string
}

export default function AppCard({
  name,
  developer,
  rating,
  downloads,
  description,
  screenshots,
  icon,
  category,
  size,
  version,
  lastUpdated
}: AppCardProps) {
  const [selectedScreenshot, setSelectedScreenshot] = useState(0)

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">★</span>
      )
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">☆</span>
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">☆</span>
      )
    }

    return stars
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-google p-6">
      {/* Header Section */}
      <div className="flex items-start space-x-4 mb-6">
        <img 
          src={icon} 
          alt={`${name} icon`}
          className="w-24 h-24 rounded-2xl shadow-md"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">{name}</h1>
          <p className="text-google-green font-medium mb-2">{developer}</p>
          
          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium">{rating}</span>
              <div className="flex">
                {renderStars(rating)}
              </div>
            </div>
            <span className="text-sm text-gray-600">{downloads}</span>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">{category}</span>
          </div>

          <CustomInstallButton 
            variant="primary" 
            size="lg"
            onInstallStart={() => console.log('Install started')}
            onInstallSuccess={() => console.log('Install successful')}
            onInstallFail={() => console.log('Install failed')}
          >
            Install
          </CustomInstallButton>
        </div>
      </div>

      {/* Screenshots Section */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Screenshot</h3>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {screenshots.map((screenshot, index) => (
            <img
              key={index}
              src={screenshot}
              alt={`Screenshot ${index + 1}`}
              className="h-64 w-auto rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Description Section */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Tentang aplikasi ini</h3>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>

      {/* App Info Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <p className="text-gray-500 mb-1">Ukuran</p>
          <p className="font-medium">{size}</p>
        </div>
        <div>
          <p className="text-gray-500 mb-1">Versi</p>
          <p className="font-medium">{version}</p>
        </div>
        <div>
          <p className="text-gray-500 mb-1">Diperbarui</p>
          <p className="font-medium">{lastUpdated}</p>
        </div>
        <div>
          <p className="text-gray-500 mb-1">Developer</p>
          <p className="font-medium text-google-blue">{developer}</p>
        </div>
      </div>


    </div>
  )
}