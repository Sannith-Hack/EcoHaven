import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Leaf, ShoppingCart, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/enhanced-button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/AuthContext"
import { useCart } from "@/contexts/CartContext"
import MiniCart from "@/components/cart/MiniCart"
import { useToast } from "@/hooks/use-toast"

const navItems = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "My Listings", path: "/my-listings" },
  { label: "Add Product", path: "/add-product" },
  { label: "Cart", path: "/cart" },
  { label: "Purchases", path: "/purchases" },
  { label: "Profile", path: "/profile" },
]

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { toast } = useToast()
  const currentPath = location.pathname
  const { isLoggedIn, login, logout } = useAuth()
  const { getTotalItems } = useCart()

  const isActive = (path: string) => currentPath === path

  const handleLogin = () => {
    navigate('/login')
  }

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out."
    })
    navigate('/')
  }

  // Guest Message Component
  const GuestMessage = () => (
    <Card className="mx-4 mb-4 border-eco-green/20 bg-eco-light/50">
      <CardContent className="p-4 text-center">
        <p className="text-eco-forest font-medium mb-4">
          You are in guest mode. Please log in or register.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            variant="eco" 
            size="sm" 
            onClick={handleLogin}
            className="min-w-[120px]"
          >
            Login
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/signup')}
            className="min-w-[120px] border-eco-green/30 hover:bg-eco-light"
          >
            Register
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <>
      <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-eco p-2 rounded-lg group-hover:shadow-eco transition-all duration-200">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-eco bg-clip-text text-transparent">
                EcoFinds
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMiniCartOpen(true)}
                className="relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
              <Link to="/profile">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              {isLoggedIn ? (
                <Button variant="outline" size="sm" onClick={logout}>
                  Logout
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleLogin}>
                    Login
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigate('/signup')}>
                    Register
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "block px-3 py-2 rounded-md text-base font-medium transition-all duration-200",
                      isActive(item.path)
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex items-center space-x-3 px-3 py-2">
                  {isLoggedIn ? (
                    <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
                      Logout
                    </Button>
                  ) : (
                    <div className="flex flex-col gap-2 w-full">
                      <Button variant="outline" size="sm" className="w-full" onClick={handleLogin}>
                        Login
                      </Button>
                      <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/signup')}>
                        Register
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <MiniCart isOpen={isMiniCartOpen} onClose={() => setIsMiniCartOpen(false)} />
      </nav>
      
      {/* Guest Message - Show only when not logged in */}
      {!isLoggedIn && (
        <div className="sticky top-16 z-40">
          <GuestMessage />
          </div>
      )}
    </>
  )
}