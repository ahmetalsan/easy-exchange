import type { Metadata } from 'next'
import React from 'react'

import '../styles/globals.scss'

export const metadata: Metadata = {
  title: 'Easy Exchange',
  description: 'Easy Exchange is a platform that allows you to exchange money with ease.',
}

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en">
    <body>{children}</body>
  </html>
)

export default RootLayout
