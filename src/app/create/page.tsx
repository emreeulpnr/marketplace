import { CreateListingForm } from "@/components/CreateListingForm";
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CreateListingPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div>
        <Button asChild variant="outline">
                <Link href="/" className="flex items-center gap-2">
                    <ArrowLeft size={16} />
                    Back to All Listings
                </Link>
        </Button>

      </div>
      <CreateListingForm />
    </div>
  );
}