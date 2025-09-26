'use client'

import { useEffect, useRef } from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'pwa-install': any
    }
  }
}

interface PWAInstallProps {
  onInstallSuccess?: () => void
  onInstallFail?: () => void
  onInstallAvailable?: () => void
}

export default function PWAInstall({ 
  onInstallSuccess, 
  onInstallFail, 
  onInstallAvailable 
}: PWAInstallProps) {
  const pwaInstallRef = useRef<any>(null)

  useEffect(() => {
    // Import pwa-install library dynamically
    import('@khmyznikov/pwa-install')

    const handleInstallSuccess = (event: any) => {
      console.log('PWA Install Success:', event.detail.message)
      onInstallSuccess?.()
    }

    const handleInstallFail = (event: any) => {
      console.log('PWA Install Failed:', event.detail.message)
      onInstallFail?.()
    }

    const handleInstallAvailable = (event: any) => {
      console.log('PWA Install Available:', event.detail.message)
      onInstallAvailable?.()
    }

    const pwaElement = pwaInstallRef.current
    if (pwaElement) {
      pwaElement.addEventListener('pwa-install-success-event', handleInstallSuccess)
      pwaElement.addEventListener('pwa-install-fail-event', handleInstallFail)
      pwaElement.addEventListener('pwa-install-available-event', handleInstallAvailable)

      // Pass the captured beforeinstallprompt event if available
      if ((window as any).promptEvent) {
        (pwaElement as any).externalPromptEvent = (window as any).promptEvent
      }
    }

    return () => {
      if (pwaElement) {
        pwaElement.removeEventListener('pwa-install-success-event', handleInstallSuccess)
        pwaElement.removeEventListener('pwa-install-fail-event', handleInstallFail)
        pwaElement.removeEventListener('pwa-install-available-event', handleInstallAvailable)
      }
    }
  }, [onInstallSuccess, onInstallFail, onInstallAvailable])

  return (
    <pwa-install
      ref={pwaInstallRef}
      manual-chrome="true"
      manual-apple="true"
      use-local-storage="true"
      install-description="Install aplikasi ini untuk pengalaman yang lebih baik"
      manifest-url="/manifest.json"
      style={{
        '--pwa-install-background-color': '#ffffff',
        '--pwa-install-text-color': '#202124',
        '--pwa-install-button-color': '#1a73e8',
        '--pwa-install-button-text-color': '#ffffff',
      }}
    />
  )
}