import { Link } from "react-router-dom"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/enhanced-button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatPrice } from "@/utils/priceFormatter"
import { useAuth } from "@/contexts/AuthContext"
import { useCart } from "@/contexts/CartContext"
import { useToast } from "@/hooks/use-toast"

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
  onToggleFavorite?: (productId: string) => void
  isFavorite?: boolean
  className?: string
}

export default function ProductCard({
  product,
  onToggleFavorite,
  isFavorite = false,
  className
}: ProductCardProps) {
  const { isLoggedIn } = useAuth()
  const { addToCart } = useCart()
  const { toast } = useToast()
  const conditionColors = {
    Excellent: "bg-eco-green text-white",
    Good: "bg-eco-sage text-foreground",
    Fair: "bg-eco-earth text-foreground"
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please log in to add items to your cart.",
        variant: "destructive"
      })
      return
    }

    addToCart({
      id: product.id,
      title: product.title,
      price: product.price
    })

    toast({
      title: "Item added to cart",
      description: `${product.title} has been added to your cart.`,
    })
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
              {formatPrice(product.price)}
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
          
          <Button
            variant="eco"
            size="icon"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </CardFooter>
      </div>
    </Card>
  )
}