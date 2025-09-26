import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PWA App Store',
  description: 'Progressive Web Application dengan instalasi mirip Google Play Store',
  manifest: '/manifest.json',
  themeColor: '#1a73e8',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'PWA App Store',
  },
  icons: {
    icon: [
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4285f4" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PWA Store" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" href="/icon-192x192.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                window.promptEvent = e;
                console.log('beforeinstallprompt event captured');
              });
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  )
}