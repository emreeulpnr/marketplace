import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { ListingDetail } from '@/components/ListingDetail'

export default async function ListingDetailPage(props: { params: { id: string } }) {
  const { id } = props.params

  const supabase = await createClient()
  const { data: listing } = await supabase
    .from('listings')
    .select('*')
    .eq('id', id)
    .single()

  if (!listing) {
    notFound()
  }

  return <ListingDetail listing={listing} />
}
