'use client'

import { useEffect, useRef, useState } from 'react'

interface CustomInstallButtonProps {
  className?: string
  children?: React.ReactNode
  onInstallStart?: () => void
  onInstallSuccess?: () => void
  onInstallFail?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export default function CustomInstallButton({
  className = '',
  children,
  onInstallStart,
  onInstallSuccess,
  onInstallFail,
  variant = 'primary',
  size = 'md'
}: CustomInstallButtonProps) {
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalling, setIsInstalling] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const pwaInstallRef = useRef<any>(null)

  useEffect(() => {
    // Import pwa-install library
    import('@khmyznikov/pwa-install').then(() => {
      // Check if app is already installed
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true)
        return
      }

      // Create hidden pwa-install element for programmatic control
      const pwaElement = document.createElement('pwa-install')
      pwaElement.setAttribute('manual-chrome', 'true')
      pwaElement.setAttribute('manual-apple', 'true')
      pwaElement.setAttribute('use-local-storage', 'true')
      pwaElement.setAttribute('install-description', 'Install aplikasi ini untuk pengalaman yang lebih baik')
      pwaElement.style.display = 'none'
      document.body.appendChild(pwaElement)
      
      pwaInstallRef.current = pwaElement

      // Listen for install events
      pwaElement.addEventListener('pwa-install-success-event', (event: any) => {
        console.log('Install success:', event.detail.message)
        setIsInstalling(false)
        setIsInstalled(true)
        onInstallSuccess?.()
      })

      pwaElement.addEventListener('pwa-install-fail-event', (event: any) => {
        console.log('Install failed:', event.detail.message)
        setIsInstalling(false)
        onInstallFail?.()
      })

      pwaElement.addEventListener('pwa-install-available-event', (event: any) => {
        console.log('Install available:', event.detail.message)
        setIsInstallable(true)
      })

      pwaElement.addEventListener('pwa-user-choice-result-event', (event: any) => {
        console.log('User choice:', event.detail.message)
        if (event.detail.message === 'dismissed') {
          setIsInstalling(false)
        }
      })

      // Pass the captured beforeinstallprompt event if available
      if ((window as any).promptEvent) {
        pwaElement.externalPromptEvent = (window as any).promptEvent
        setIsInstallable(true)
      }

      // Check if install is available
      if (pwaElement.isInstallAvailable) {
        setIsInstallable(true)
      }
    })

    return () => {
      if (pwaInstallRef.current && document.body.contains(pwaInstallRef.current)) {
        document.body.removeChild(pwaInstallRef.current)
      }
    }
  }, [onInstallSuccess, onInstallFail])

  const handleInstallClick = async () => {
    if (!pwaInstallRef.current || isInstalling || isInstalled) return

    setIsInstalling(true)
    onInstallStart?.()

    try {
      // Show the install dialog
      if (pwaInstallRef.current.showDialog) {
        pwaInstallRef.current.showDialog()
      } else if (pwaInstallRef.current.install) {
        await pwaInstallRef.current.install()
      }
    } catch (error) {
      console.error('Install error:', error)
      setIsInstalling(false)
      onInstallFail?.()
    }
  }

  const getButtonStyles = () => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2'
    
    const sizeStyles = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    }

    const variantStyles = {
      primary: 'bg-google-green hover:bg-green-600 text-white shadow-google hover:shadow-google-hover focus:ring-green-500',
      secondary: 'bg-google-blue hover:bg-blue-700 text-white shadow-google hover:shadow-google-hover focus:ring-blue-500',
      outline: 'border-2 border-google-green text-google-green hover:bg-google-green hover:text-white focus:ring-green-500'
    }

    const disabledStyles = 'opacity-50 cursor-not-allowed transform-none hover:scale-100'

    return `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${(isInstalling || isInstalled) ? disabledStyles : ''} ${className}`
  }

  const getButtonText = () => {
    if (isInstalled) return 'Terinstall'
    if (isInstalling) return 'Menginstall...'
    return children || 'Install App'
  }

  const getButtonIcon = () => {
    if (isInstalled) {
      return (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    }
    
    if (isInstalling) {
      return (
        <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )
    }

    return (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  }

  // Don't show button if not installable and not already installed
  if (!isInstallable && !isInstalled) {
    return null
  }

  return (
    <button
      onClick={handleInstallClick}
      disabled={isInstalling || isInstalled}
      className={getButtonStyles()}
      aria-label={isInstalled ? 'Aplikasi sudah terinstall' : 'Install aplikasi PWA'}
    >
      {getButtonIcon()}
      {getButtonText()}
    </button>
  )
}