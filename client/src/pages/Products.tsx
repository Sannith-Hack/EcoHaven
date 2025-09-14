import { useState, useMemo, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/enhanced-button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductCard from "@/components/product/ProductCard";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
}

const categories = ["All", "Clothing", "Electronics", "Furniture", "Books", "Household"];

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

// Products.tsx

// Products.tsx

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
<<<<<<< HEAD
        const response = await fetch('http://localhost:3000/products');
=======
        const response = await fetch('http://localhost:3000/api/products');
>>>>>>> f4166b0a8760816cd273e47d9e80f7cea9536716
        if (response.ok) {
          const data = await response.json();

          // This fixes both the ID (number -> string) and Price (string -> number)
          const transformedData = data.map((product: any) => ({
            ...product,
            id: String(product.id),          // Convert ID to a string
            price: parseFloat(product.price) // Convert price to a number
          }));

          setProducts(transformedData);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || product.category.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Sustainable Products</h1>
          <p className="text-muted-foreground">Discover unique pre-loved items from our eco-conscious community</p>
        </div>
        <div className="mb-8 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48"><SelectValue placeholder="Select category" /></SelectTrigger>
              <SelectContent>
                {categories.map((category) => (<SelectItem key={category} value={category}>{category}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mb-6">
          <p className="text-muted-foreground">
            {loading ? 'Loading...' : `${filteredProducts.length} ${filteredProducts.length === 1 ? 'product' : 'products'} found`}
          </p>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-lg font-semibold">Loading products...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  title: product.name,
                  description: product.description,
                  price: product.price,
                  category: product.category,
                  image: `http://localhost:3000${product.image_url}`,
                  condition: "Excellent"
                }}
                onToggleFavorite={() => {}}
                isFavorite={false}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            {products.length === 0 ? (
                <>
                    <h3 className="text-lg font-semibold mb-2">No products have been added yet</h3>
                    <p className="text-muted-foreground mb-4">Be the first to add a sustainable product!</p>
                </>
            ) : (
                <>
                    <h3 className="text-lg font-semibold mb-2">No products found</h3>
                    <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
                </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}