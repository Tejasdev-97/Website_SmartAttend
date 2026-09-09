import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SmartAttend Admin Console',
  description: 'Manage attendance, academics, timetables, and people across your institution.',
  generator: 'SmartAttend',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0B1F3A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
