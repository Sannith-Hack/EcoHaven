import { useState } from "react";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { formatPrice } from "@/utils/priceFormatter";

const Cart = () => {
  const { toast } = useToast();
  
  // Mock cart data - in a real app this would come from context/state management
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Sustainable Cotton T-Shirt",
      description: "Organic cotton t-shirt in mint green",
      price: 25,
      quantity: 2,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Bamboo Water Bottle",
      description: "Eco-friendly bamboo water bottle with steel interior",
      price: 35,
      quantity: 1,
      image: "/placeholder.svg"
    }
  ]);

  const handleRemoveItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: "Product has been removed from your cart"
    });
  };

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      handleRemoveItem(id);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleCheckout = () => {
    toast({
      title: "Purchase Successful!",
      description: "Your order has been processed. Check your purchases page."
    });
    setCartItems([]);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-eco-sage/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-eco-forest mb-8">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="text-eco-forest/60">
                  <ShoppingBag className="mx-auto h-16 w-16 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground mb-6">
                    Start shopping for sustainable products
                  </p>
                  <Link to="/products">
                    <Button variant="eco">
                      Browse Products
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="shadow-md border-eco-green/20">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 bg-eco-sage/20 rounded-lg flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-eco-forest mb-1">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-3">
                            {item.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-sm">Qty:</span>
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                  className="h-8 w-8 p-0"
                                >
                                  -
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                  className="h-8 w-8 p-0"
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-semibold text-eco-green">
                                {formatPrice(item.price * item.quantity)}
                              </span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-destructive hover:text-destructive p-2"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="shadow-lg border-eco-green/20 sticky top-4">
                  <CardHeader>
                    <CardTitle className="text-eco-forest">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span className="text-eco-green">{formatPrice(total)}</span>
                      </div>
                    </div>
                    <Button 
                      variant="eco" 
                      size="lg" 
                      className="w-full mt-6"
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout
                    </Button>
                    <Link to="/products">
                      <Button variant="outline" size="lg" className="w-full">
                        Continue Shopping
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;