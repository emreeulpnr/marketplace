import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { ListingDetail } from '@/components/ListingDetail'

export default async function ListingDetailPage({ params }: any) {
  const supabase = await createClient()
  const { data: listing } = await supabase
    .from('listings')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!listing) {
    notFound()
  }

  return <ListingDetail listing={listing} />
}
