import './globals.css'
import 'katex/dist/katex.min.css'

import type { Metadata } from 'next'

import Providers from '@/app/providers'
import { BASE_METADATA } from '@/contents/metadata'
import { Inter, JetBrainsMono } from '@/lib/font'
import { cn } from '@/lib/utils'

import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata: Metadata = {
  ...BASE_METADATA,
}

import { Toaster } from 'react-hot-toast'

// ...

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1.0, user-scalable=no"
        />
        {/* PWA Meta Tags */}
        <meta name="application-name" content="PLEARN" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="PLEARN" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="format-detection" content="telephone=no" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/images/icon-192.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/images/icon-192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/icon-192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/images/icon-192.png"
        />

        {/* Splash Screens for iOS */}
        <link
          rel="apple-touch-startup-image"
          href="/images/splash.png"
          media="(device-width: 375px) and (device-height: 812px)"
        />

        {/* Favicon */}
        <link
          rel="shortcut icon"
          href="/images/favicon.png"
          type="image/x-icon"
        />
      </head>
      <body className={cn(Inter.variable, JetBrainsMono.variable, 'dark')}>
        <Providers>{children}</Providers>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
        <GoogleAnalytics gaId="" />
      </body>
    </html>
  )
}
