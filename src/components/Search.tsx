import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Search() {
  return (
    <form action="/" method="GET" className="flex w-full items-center space-x-2 mb-6">
      <Input
        type="text"
        name="q"
        placeholder="Search..."
        className="flex-1"
      />
      <Button type="submit">Search</Button>
    </form>
  )
}