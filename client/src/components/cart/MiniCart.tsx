import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/utils/priceFormatter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { ShoppingCart, X } from "lucide-react";
import { Link } from "react-router-dom";

interface MiniCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MiniCart({ isOpen, onClose }: MiniCartProps) {
  const { cartItems, getTotalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <Card className="relative w-80 max-h-96 overflow-hidden shadow-2xl animate-in slide-in-from-right">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Cart ({cartItems.length})
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {cartItems.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b">
                    <div className="flex-1">
                      <p className="font-medium text-sm line-clamp-1">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity} × {formatPrice(item.price)}
                      </p>
                    </div>
                    <p className="font-semibold text-sm">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-lg text-primary">
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>
                <Link to="/cart" onClick={onClose}>
                  <Button variant="eco" className="w-full">
                    View Cart
                  </Button>
                </Link>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}