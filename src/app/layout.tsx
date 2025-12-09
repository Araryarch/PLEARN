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
