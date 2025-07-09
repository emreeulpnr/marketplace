'use client'

import { useActionState, useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { sendMessage, type MessageState } from "@/app/actions/sendMessage"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" disabled={pending}>{pending ? "Sending..." : "Send Message"}</Button>;
}

export function MessageSellerDialog({ listing }: { listing: any }) {

  const initialState: MessageState = { message: null, success: false, errors: {} };
  const [state, dispatch] = useActionState(sendMessage, initialState);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (state.success && state.message) {
      toast.success(state.message);
      setIsOpen(false);
    } else if (!state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full mt-4">Send Message</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send a message about "{listing.title}"</DialogTitle>
        </DialogHeader>
        <form action={dispatch} className="space-y-4">
            <input type="hidden" name="listing_id" value={listing.id} />
            <input type="hidden" name="seller_email" value={listing.seller_email} />
            <div>
                <Label htmlFor="buyer_email">Your Email</Label>
                <Input id="buyer_email" name="buyer_email" type="email" required />
                {state.errors?.buyer_email && <p className="text-sm text-red-500 mt-1">{state.errors.buyer_email[0]}</p>}
            </div>
            <div>
                <Label htmlFor="message">Your Message</Label>
                <Textarea id="message" name="message" required minLength={10} />
                {state.errors?.message && <p className="text-sm text-red-500 mt-1">{state.errors.message[0]}</p>}
            </div>
            <SubmitButton />
        </form>
      </DialogContent>
    </Dialog>
  )
}