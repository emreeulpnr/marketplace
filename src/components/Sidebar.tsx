import Link from "next/link"

const categories = [
  { name: "All Categories", slug: "all" },
  { name: "Electronics", slug: "electronics" },
  { name: "Vehicles", slug: "vehicles" },
  { name: "Real Estate", slug: "real-estate" },
  { name: "Home Goods", slug: "homegoods" },
  { name: "Furniture", slug: "furniture" },
  { name: "Clothing", slug: "clothing" },
  { name: "Books", slug: "books" },
  { name: "Other", slug: "other" },

]

interface SidebarProps {
  currentCategory?: string;
}

export function Sidebar({ currentCategory }: SidebarProps) {
  return (
    <aside className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <nav className="space-y-1">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={category.slug === "all" ? "/" : `/?category=${category.slug}`}
              className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors
                ${
                  (currentCategory === category.slug || (!currentCategory && category.slug === 'all'))
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent'
                }
              `}
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}