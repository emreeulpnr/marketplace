import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Toaster } from "@/components/ui/sonner"


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Marketplace Challenge',
  description: 'A mini-marketplace built with Next.js and Supabase',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <Navbar />
        <main className="container mx-auto p-4">{children}</main>
        <Toaster />
      </body>
    </html>
  )
}