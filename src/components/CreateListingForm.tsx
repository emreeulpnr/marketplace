"use client";

import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { createListing, type State } from "@/app/actions/createListing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Upload } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Creating..." : "Create Listing"}
    </Button>
  );
}

export function CreateListingForm() {
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useActionState(createListing, initialState);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (state.message) {
      toast.error("Error", {
        description: state.message,
      });
    }
  }, [state]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-sm">
        <form action={dispatch} className="space-y-6">
          <div>
            <Label>Photos</Label>
            <label
              htmlFor="image-upload"
              className="mt-2 flex justify-center items-center w-full h-32 px-6 border-2 border-dashed rounded-md cursor-pointer"
            >
              <div className="text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-1 text-sm text-gray-600">Add Photos</p>
                <p className="text-xs text-gray-500">
                  JPEG, PNG, or WEBP (Max 5MB)
                </p>
              </div>
              <input
                id="image-upload"
                name="image"
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What are you selling?"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
            <Select
              name="category"
              onValueChange={setCategory}
              value={category}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="vehicles">Vehicles</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="homegoods">Home Goods</SelectItem>
                <SelectItem value="real-estate">Real Estate</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="books">Books</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="price">Price *</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" defaultValue="Palo Alto, CA" />
          </div>

          <div>
            <Label htmlFor="seller_email">Contact Email *</Label>
            <Input
              id="seller_email"
              name="seller_email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your item..."
            />
          </div>

          <SubmitButton />
        </form>
      </div>


      <div className="hidden lg:block">
        <h3 className="text-lg font-semibold mb-4">Preview</h3>
        <div className="sticky top-24 bg-white p-4 rounded-lg shadow-sm border">
          <div className="aspect-square w-full bg-gray-100 rounded-md mb-4 flex items-center justify-center">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-sm text-gray-500">Image</span>
            )}
          </div>
          <h4 className="font-bold text-lg">{title || "Product Title"}</h4>
          <p className="text-xl text-primary font-semibold">
            ${price || "0.00"}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Listed in Palo Alto, CA
          </p>
          <hr className="my-4" />
          <h5 className="font-semibold">Seller Information</h5>
          <p className="text-sm text-muted-foreground">{email || "seller@email.com"}</p>
        </div>
      </div>
    </div>
  );
}