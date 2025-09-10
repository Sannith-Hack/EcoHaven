import { useState } from "react";
import { Button } from "@/components/ui/enhanced-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const AddProduct = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "Clothing",
    "Electronics", 
    "Furniture",
    "Books",
    "Household"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.title || !formData.description || !formData.category || !formData.price) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    // Convert price to a number before sending
    const productData = {
      ...formData,
      price: parseFloat(formData.price)
    };

    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:3001/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const result = await response.json();
      console.log('Product added:', result);

      toast({
        title: "Success!",
        description: "Product added successfully"
      });

      // Reset form on success
      setFormData({
        title: "",
        description: "",
        category: "",
        price: "",
      });
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-eco-sage/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg border-eco-green/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-eco-forest">
                Add New Product
              </CardTitle>
              <p className="text-muted-foreground">
                List your sustainable items for others to discover
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Product Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter product title"
                    className="border-eco-green/20 focus:border-eco-green"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe your product in detail"
                    rows={4}
                    className="border-eco-green/20 focus:border-eco-green"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className="border-eco-green/20 focus:border-eco-green">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="border-eco-green/20 focus:border-eco-green"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Product Image</Label>
                  <div className="border-2 border-dashed border-eco-green/30 rounded-lg p-8 text-center">
                    <div className="text-eco-forest/60">
                      <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <p>Click to upload or drag and drop</p>
                      <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  variant="eco" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting} // Disable the button while the request is in flight
                >
                  {isSubmitting ? 'Adding Product...' : 'Add Product'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
