import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/enhanced-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const AddProduct = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ["Clothing", "Electronics", "Furniture", "Books", "Household"];

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.name || !formData.description || !formData.category || !formData.price || !image) {
      toast({
        title: "Error",
        description: "Please fill in all fields and upload an image",
        variant: "destructive",
      });
      return;
    }

    const productData = new FormData();
    productData.append("name", formData.name);
    productData.append("description", formData.description);
    productData.append("category", formData.category);
    productData.append("price", formData.price);
    productData.append("image", image);

    setIsSubmitting(true);
    toast({
      title: "Adding Product...",
      description: "Please wait while we add your product.",
    });

    try {
      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        body: productData,
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      toast({
        title: "Success!",
        description: "Product added successfully",
      });

      setFormData({ name: "", description: "", category: "", price: "" });
      setImage(null);
      navigate('/products');
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-eco-sage/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg border-eco-green/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-eco-forest">Add New Product</CardTitle>
              <p className="text-muted-foreground">List your sustainable items for others to discover</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Title</Label>
                  <Input id="name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} placeholder="Enter product title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" value={formData.description} onChange={(e) => handleInputChange("description", e.target.value)} placeholder="Describe your product in detail" rows={4} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (<SelectItem key={category} value={category.toLowerCase()}>{category}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input id="price" type="number" value={formData.price} onChange={(e) => handleInputChange("price", e.target.value)} placeholder="0.00" min="0" step="0.01" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Product Image</Label>
                  <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${isDragActive ? "border-eco-green" : "border-eco-green/30"}`}>
                    <input {...getInputProps()} />
                    {image ? (<p>{image.name}</p>) : isDragActive ? (<p>Drop the files here ...</p>) : (<p>Drag 'n' drop some files here, or click to select files</p>)}
                  </div>
                </div>
                <Button type="submit" variant="eco" size="lg" className="w-full" disabled={isSubmitting}>
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