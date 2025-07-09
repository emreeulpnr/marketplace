import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold">
          Marketplace
        </Link>
        <Button asChild>
          <Link href="/create">Sell</Link>
        </Button>
      </div>
    </header>
  )
}