import Link from 'next/link'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from 'next/image'

type Listing = {
  id: string;
  title: string;
  price: number;
  image_url: string | null;
  category: string;
}

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link href={`/listing/${listing.id}`} className="group">
      <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
        {/* DÜZELTME: Ebeveyn elemente net boyutlandırma için `aspect-square` eklendi. */}
        <CardHeader className="p-0 overflow-hidden rounded-t-lg relative bg-gray-100 aspect-square">
          <Image
            src={listing.image_url || 'https://via.placeholder.com/300'}
            alt={listing.title}
            fill // 'fill' prop'u ebeveynini doldurmasını sağlar.
            /* 'h-auto' ve 'w-full' kaldırıldı çünkü 'fill' ile birlikte kullanılmazlar.
              'object-contain' resmin tamamının görünmesini sağlar.
            */
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </CardHeader>
        <CardContent className="p-4 flex flex-col flex-grow">
          <h3 className="font-bold text-lg truncate">{listing.title}</h3>
          <p className="text-sm text-gray-500">{listing.category}</p>
          <p className="text-xl font-semibold mt-auto pt-2">${listing.price}</p>
        </CardContent>
      </Card>
    </Link>
  )
}