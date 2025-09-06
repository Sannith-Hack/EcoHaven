import { useState } from "react";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const MyListings = () => {
  const { toast } = useToast();
  
  // Mock data - in a real app this would come from an API
  const [listings, setListings] = useState([
    {
      id: 1,
      title: "Vintage Leather Jacket",
      description: "Beautiful vintage leather jacket in excellent condition",
      category: "clothing",
      price: 85.00,
      image: "/images/image1.png",
      status: "active"
    },
    {
      id: 2,
      title: "iPhone 12 Pro",
      description: "Unlocked iPhone 12 Pro, minor scratches on back",
      category: "electronics",
      price: 650.00,
      image: "/images/image2.png",
      status: "sold"
    },
    {
      id: 3,
      title: "Wooden Coffee Table",
      description: "Handcrafted wooden coffee table, sustainable oak",
      category: "furniture",
      price: 120.00,
      image: "/images/image3.png",
      status: "active"
    }
  ]);

  const handleDelete = (id: number) => {
    setListings(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Product Deleted",
      description: "Your listing has been removed successfully"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-eco-green text-white";
      case "sold":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-300 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-eco-sage/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-eco-forest">My Listings</h1>
            <p className="text-muted-foreground mt-2">
              Manage your sustainable marketplace listings
            </p>
          </div>
          <Link to="/add-product">
            <Button variant="eco" size="lg">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>

        {listings.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-eco-forest/60">
                <svg className="mx-auto h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">No listings yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start selling by adding your first sustainable product
                </p>
                <Link to="/add-product">
                  <Button variant="eco">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Product
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {listings.map((item) => (
              <Card key={item.id} className="shadow-md hover:shadow-lg transition-shadow border-eco-green/20">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="p-2">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="p-2 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square bg-eco-sage/20 rounded-lg mb-4 flex items-center justify-center">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <CardTitle className="text-lg mb-2 text-eco-forest">
                    {item.title}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-eco-green">
                      ${item.price.toFixed(2)}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;