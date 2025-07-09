'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export type State = {
  errors?: {
    title?: string[];
    price?: string[];
    category?: string[];
    seller_email?: string[];
    description?: string[];
    image?: string[];
  };
  message?: string | null;
};


const listingSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  price: z.coerce.number().min(0.01, 'Price must be greater than 0'),
  category: z.string().min(1, 'You must select a category'),
  seller_email: z.string().email('Please enter a valid email address'),
  description: z.string().optional(),
})

export async function createListing(prevState: State, formData: FormData): Promise<State> {
  const supabase = await createClient()

  const validatedFields = listingSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const imageFile = formData.get('image') as File
  if (!imageFile || imageFile.size === 0) {
    return { errors: { image: ['Please upload an image.'] } }
  }

  const { title, description, price, category, seller_email } = validatedFields.data;


  const fileExtension = imageFile.name.split('.').pop();
  const fileName = imageFile.name.replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i')
    .replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
  const finalFileName = `${Date.now()}-${fileName}.${fileExtension}`;



  const { data: imageData, error: imageError } = await supabase.storage
    .from('listing-images')

    .upload(finalFileName, imageFile);

  if (imageError) {
    console.error('Image Upload Error:', imageError)

    return { message: `Image Upload Error: ${imageError.message}` }
  }

  const { data: { publicUrl } } = supabase.storage
    .from('listing-images')
    .getPublicUrl(imageData.path)

  const { error: insertError } = await supabase.from('listings').insert({
    title,
    description,
    price,
    category,
    seller_email,
    image_url: publicUrl,
  })

  if (insertError) {
    console.error('Insert Error:', insertError)
    return { message: "Error: Could not save listing to the database." }
  }

  revalidatePath('/')
  redirect('/')
}