import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { ListingDetail } from '@/components/ListingDetail'

interface PageProps {
  params: {
    id: string
  }
}

export default async function ListingDetailPage({ params }: PageProps) {
  const supabase = await createClient()
  const { data: listing } = await supabase
    .from('listings')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!listing) {
    notFound();
  }

  return <ListingDetail listing={listing} />
}
