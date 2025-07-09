import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { MessageSellerDialog } from '@/components/MessageSellerDialog'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default async function ListingDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: listing } = await supabase
    .from('listings')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!listing) {
    notFound();
  }

  return (
    <div>
        <div className="mb-8">
            <Button asChild variant="outline">
                <Link href="/" className="flex items-center gap-2">
                    <ArrowLeft size={16} />
                    Back to All Listings
                </Link>
            </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* DÜZELTME BAŞLANGICI */}
            <div>
              {/* 1. Parent div'e `relative` ve bir en-boy oranı (`aspect-square`) veriyoruz.
                Bu, resmin dolduracağı alanı tanımlar.
              */}
              <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={listing.image_url || 'https://via.placeholder.com/600'}
                  alt={listing.title}
                  fill // ✅ `fill` prop'u, resmin parent'ını doldurmasını sağlar.
                  className="object-cover" // ✅ Resmin oranını bozmadan alanı kaplamasını sağlar.
                />
              </div>
            </div>
            {/* DÜZELTME SONU */}

            <div className="space-y-4">
                <h1 className="text-4xl font-bold">{listing.title}</h1>
                <p className="text-3xl font-semibold text-primary">${listing.price}</p>
                <div>
                    <span className="font-semibold">Category: </span>
                    <span>{listing.category}</span>
                </div>
                <div>
                    <span className="font-semibold">Location: </span>
                    <span>{listing.location}</span>
                </div>
                <div className="pt-4">
                  <h2 className="text-xl font-semibold mb-2">Description</h2>
                  <p className="text-gray-700">{listing.description || "No description provided."}</p>
                </div>
                <div className="pt-4">
                    <h2 className="text-xl font-semibold mb-2">Seller Information</h2>
                    <p className="text-gray-700">{listing.seller_email}</p>
                </div>
                <MessageSellerDialog listing={listing} />
            </div>
        </div>
    </div>
  )
}