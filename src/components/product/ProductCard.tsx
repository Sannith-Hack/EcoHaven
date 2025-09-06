import { Link } from "react-router-dom"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/enhanced-button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"

interface Product {
  id: string
  title: string
  description: string
  price: number
  category: string
  image?: string
  condition: "Excellent" | "Good" | "Fair"
}

interface ProductCardProps {
  product: Product
  onAddToCart?: (productId: string) => void
  onToggleFavorite?: (productId: string) => void
  isFavorite?: boolean
  className?: string
}

export default function ProductCard({
  product,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
  className
}: ProductCardProps) {
  const conditionColors = {
    Excellent: "bg-eco-green text-white",
    Good: "bg-eco-sage text-foreground",
    Fair: "bg-eco-earth text-foreground"
  }

  return (
    <Card className={cn(
      "group overflow-hidden transition-all duration-300 hover:shadow-eco hover:-translate-y-1 eco-card",
      className
    )}>
      <div className="relative overflow-hidden">
        {/* Placeholder image with eco theme */}
        <div className="aspect-square bg-gradient-light flex items-center justify-center relative">
          <div className="w-16 h-16 bg-eco-green/20 rounded-full flex items-center justify-center">
            <span className="text-2xl text-eco-green font-bold">
              {product.title.charAt(0)}
            </span>
          </div>
          
          {/* Favorite button */}
          {onToggleFavorite && (
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onToggleFavorite(product.id)
              }}
              className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-all duration-200"
            >
              <Heart 
                className={cn(
                  "h-4 w-4 transition-colors",
                  isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"
                )}
              />
            </button>
          )}
          
          {/* Condition badge */}
          <Badge 
            className={cn(
              "absolute top-3 left-3",
              conditionColors[product.condition]
            )}
          >
            {product.condition}
          </Badge>
        </div>

        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
              {product.title}
            </h3>
            <span className="text-lg font-bold text-primary">
              ${product.price}
            </span>
          </div>
          
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {product.description}
          </p>
          
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex gap-2">
          <Link to={`/products/${product.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
          
          {onAddToCart && (
            <Button
              variant="eco"
              size="icon"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onAddToCart(product.id)
              }}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </div>
    </Card>
  )
}