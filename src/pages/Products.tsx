import { useState, useMemo } from "react"
import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/enhanced-button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProductCard from "@/components/product/ProductCard"

// Mock products data
const mockProducts = [
  {
    id: "1",
    title: "Vintage Wooden Chair",
    description: "Beautiful handcrafted wooden chair in excellent condition. Perfect for dining room or office.",
    price: 75,
    category: "Furniture",
    condition: "Excellent" as const
  },
  {
    id: "2",
    title: "MacBook Pro 2019",
    description: "13-inch MacBook Pro, gently used with original charger and box. Great for students and professionals.",
    price: 899,
    category: "Electronics",
    condition: "Good" as const
  },
  {
    id: "3",
    title: "Designer Handbag",
    description: "Authentic leather handbag from premium brand. Timeless style with minimal wear.",
    price: 120,
    category: "Fashion",
    condition: "Excellent" as const
  },
  {
    id: "4",
    title: "Classic Literature Set",
    description: "Collection of 20 classic novels in great condition. Perfect for book lovers.",
    price: 45,
    category: "Books",
    condition: "Good" as const
  },
  {
    id: "5",
    title: "Coffee Table",
    description: "Modern glass coffee table with metal legs. Shows some minor scratches but very functional.",
    price: 85,
    category: "Furniture",
    condition: "Fair" as const
  },
  {
    id: "6",
    title: "Kitchen Appliance Set",
    description: "Blender, toaster, and coffee maker set. All items work perfectly and are well-maintained.",
    price: 150,
    category: "Household",
    condition: "Good" as const
  }
]

const categories = ["All", "Clothing", "Electronics", "Furniture", "Books", "Household"]

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [favorites, setFavorites] = useState<string[]>([])

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const handleAddToCart = (productId: string) => {
    console.log("Adding to cart:", productId)
    // TODO: Implement cart functionality
  }

  const handleToggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Sustainable Products</h1>
          <p className="text-muted-foreground">
            Discover unique pre-loved items from our eco-conscious community
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favorites.includes(product.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}