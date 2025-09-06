import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, Recycle, Users, Leaf, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import EcoBackground from "@/components/effects/EcoBackground"
import ProductCard from "@/components/product/ProductCard"

// Mock featured products
const featuredProducts = [
  {
    id: "1",
    title: "Vintage Wooden Chair",
    description: "Beautiful handcrafted wooden chair in excellent condition",
    price: 75,
    category: "Furniture",
    condition: "Excellent" as const
  },
  {
    id: "2", 
    title: "MacBook Pro 2019",
    description: "13-inch MacBook Pro, gently used with original charger",
    price: 899,
    category: "Electronics", 
    condition: "Good" as const
  },
  {
    id: "3",
    title: "Designer Handbag",
    description: "Authentic leather handbag from premium brand",
    price: 120,
    category: "Fashion",
    condition: "Excellent" as const
  }
]

const stats = [
  { icon: Users, label: "Active Users", value: "10,000+" },
  { icon: Recycle, label: "Items Recycled", value: "50,000+" },
  { icon: Leaf, label: "CO₂ Saved", value: "2,500kg" }
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen relative">
      <EcoBackground />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-eco bg-clip-text text-transparent">
              Sustainable
            </span>{" "}
            <span className="text-foreground">
              Second-Hand Marketplace
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover unique pre-loved items while reducing environmental impact. 
            Give products a second life and join our community of eco-conscious shoppers.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search for sustainable products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/products">
              <Button variant="eco" size="lg" className="min-w-[200px]">
                Browse Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/add-product">
              <Button variant="ecoSecondary" size="lg" className="min-w-[200px]">
                Sell Your Items
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <Card key={index} className="eco-card">
                <CardContent className="p-6 text-center">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-eco-light/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground text-lg">
              Discover handpicked sustainable treasures from our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={(id) => console.log("Add to cart:", id)}
                onToggleFavorite={(id) => console.log("Toggle favorite:", id)}
              />
            ))}
          </div>

          <div className="text-center">
            <Link to="/products">
              <Button variant="outline" size="lg">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose EcoFinds */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose EcoFinds?</h2>
            <p className="text-muted-foreground text-lg">
              More than just a marketplace - we're a movement towards sustainability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-eco rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Circular Economy</h3>
              <p className="text-muted-foreground">
                Extend product lifecycles and reduce waste by giving items a second chance
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-eco rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Eco-Friendly</h3>
              <p className="text-muted-foreground">
                Reduce your carbon footprint while finding unique, quality products
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-eco rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-muted-foreground">
                Join a passionate community of environmentally conscious buyers and sellers
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}