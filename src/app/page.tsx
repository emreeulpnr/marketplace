import { createClient } from '@/lib/supabase/server'
import { ListingCard } from '@/components/ListingCard'
import { Database } from '@/lib/database.types'
import { Sidebar } from '@/components/Sidebar'
import { Search } from '@/components/Search'

export const dynamic = 'force-dynamic'

type Listing = Database['public']['Tables']['listings']['Row']

export default async function HomePage({
  searchParams
}: {
  searchParams: { q?: string; category?: string }
}) {
  const supabase = await createClient()

  let query = supabase.from('listings').select('*')

  if (searchParams.q) {
    const searchTerm = searchParams.q.toLowerCase();
    query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
  }

  if (searchParams.category && searchParams.category !== 'all') {
    query = query.eq('category', searchParams.category)
  }

  const { data: listings, error } = await query.order('created_at', { ascending: false });

  if(error) {
    console.error("Error fetching listings:", error);
    return <p>An error occurred while loading listings.</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
      <div className="md:col-span-1 lg:col-span-1">
        <Sidebar currentCategory={searchParams.category} />
      </div>

      <div className="md:col-span-3 lg:col-span-4">
        <h1 className="text-3xl font-bold mb-4">Today's Picks</h1>
        <Search />

        {listings.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold">No Results Found</h2>
            <p className="text-muted-foreground mt-2">Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map((listing: Listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}