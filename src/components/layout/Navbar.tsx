import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Leaf, ShoppingCart, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/enhanced-button"
import { cn } from "@/lib/utils"

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
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => currentPath === path

  return (
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
            <Link to="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              Logout
            </Button>
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
                <Button variant="outline" size="sm" className="w-full">
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}