'use client'

import { useEffect } from 'react'

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration)
            
            // Check for updates
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed') {
                    if (navigator.serviceWorker.controller) {
                      // New update available
                      console.log('New content is available; please refresh.')
                      
                      // Show update notification
                      if ('Notification' in window && Notification.permission === 'granted') {
                        new Notification('Update Available', {
                          body: 'A new version of the app is available. Please refresh to update.',
                          icon: '/icon-192x192.png'
                        })
                      }
                    } else {
                      // Content is cached for the first time
                      console.log('Content is cached for offline use.')
                    }
                  }
                })
              }
            })
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError)
          })
      })

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('Message from SW:', event.data)
      })

      // Handle service worker updates
      let refreshing = false
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return
        refreshing = true
        window.location.reload()
      })
    }

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then((permission) => {
        console.log('Notification permission:', permission)
      })
    }
  }, [])

  return null // This component doesn't render anything
}