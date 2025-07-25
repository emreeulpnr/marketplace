'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MessageSellerDialog } from '@/components/MessageSellerDialog'
import { Database } from '@/lib/database.types'

// Gelen 'listing' verisinin tipini burada tanımlıyoruz.
type Listing = Database['public']['Tables']['listings']['Row'];

interface ListingDetailProps {
  listing: Listing;
}

// Bu bileşen sadece arayüzü (UI) çizer. Veri çekme işlemi yapmaz.
export function ListingDetail({ listing }: ListingDetailProps) {
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
            <div>
              <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={listing.image_url || 'https://via.placeholder.com/600'}
                  alt={listing.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

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