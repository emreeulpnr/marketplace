import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { ListingDetail } from '@/components/ListingDetail' // ✅ Yeni UI bileşenini import ediyoruz

// Bu sayfa artık sadece veri çekmekle sorumlu.
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

  // Veriyi çektikten sonra, bu veriyi arayüz bileşenine prop olarak gönderiyoruz.
  return <ListingDetail listing={listing} />
}