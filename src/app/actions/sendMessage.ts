'use server'

import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

export type MessageState = {
    errors?: {
        message?: string[];
        buyer_email?: string[];
    };
    message?: string | null;
    success?: boolean;
}

const messageSchema = z.object({
  message: z.string().min(10, "Message must be at least 10 characters."),
  buyer_email: z.string().email("Please enter a valid email address."),
  seller_email: z.string().email(),
  listing_id: z.string().uuid(),
})

export async function sendMessage(prevState: MessageState, formData: FormData): Promise<MessageState> {

  const supabase = await createClient();

  const validatedFields = messageSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  const { error } = await supabase.from('messages').insert(validatedFields.data);

  if (error) {
    console.error("Send Message Error: ", error);

    return { success: false, message: "Error: Your message could not be sent." }
  }

  return { success: true, message: "Your message has been sent successfully!" }
}