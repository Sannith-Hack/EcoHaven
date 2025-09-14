// EcoHaven-FireBase/client/src/components/EditProfile.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/enhanced-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Phone, MapPin, Mail, Camera, Save, X, Leaf } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    profileImage: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error("No authentication token found.");
        }
        const response = await axios.get('http://localhost:3001/api/auth/home', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const userData = response.data.user;
        setFormData({
          username: userData.username || "",
          email: userData.email || "",
          phone: userData.phone || "",
          location: userData.location || "",
          bio: userData.bio || "",
          profileImage: userData.profile_picture || "/placeholder.svg"
        });
      } catch (error) {
        toast({
          title: "Error fetching profile data",
          description: error.message || "Failed to load user information.",
          variant: "destructive",
        });
      } finally {
        setIsFetching(false);
      }
    };
    fetchUserProfile();
  }, [toast]);


  const handleInputChange = (field: string, value: string) => {
    if (field === "phone") {
      // Only allow numeric input and limit to 12 digits
      const numericValue = value.replace(/\D/g, "").slice(0, 12);
      setFormData(prev => ({ ...prev, [field]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("User not authenticated.");
      }

      await axios.put("http://localhost:3001/api/auth/update-profile", {
        username: formData.username,
        phone: formData.phone,
        location: formData.location,
        bio: formData.bio,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      toast({
        title: "Profile Updated Successfully! 🌱",
        description: "Your sustainable profile has been updated with your new information.",
      });
      navigate("/profile");
    } catch (error) {
      toast({
        title: "Update Failed",
        description: error.response?.data?.message || "An error occurred while updating your profile.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/profile");
    toast({
      title: "Changes Cancelled",
      description: "Your profile changes have been discarded.",
      variant: "destructive",
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This part handles the file selection and is a starting point for image upload.
    // The backend logic for handling file uploads needs to be implemented separately.
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profileImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
      toast({
        title: "Image Selected",
        description: "Image is ready for upload when you save changes.",
      });
    }
  };

  if (isFetching) {
    return <div className="min-h-screen flex items-center justify-center">Loading profile editor...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-eco-sage/20 p-4">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Leaf className="h-8 w-8 text-eco-green" />
            <h1 className="text-3xl font-bold text-foreground">Edit Profile</h1>
          </div>
          <p className="text-muted-foreground">
            Update your sustainable marketplace profile
          </p>
        </div>

        <Card className="bg-gradient-card shadow-eco border-eco-accent/20">
          <CardHeader className="pb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="h-20 w-20 border-4 border-eco-accent">
                  <AvatarImage src={formData.profileImage} alt="Profile picture" />
                  <AvatarFallback className="bg-eco-sage text-eco-green text-xl font-semibold">
                    {formData.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {/* Profile Picture Upload Button */}
                <input
                  id="profile-picture-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
            <Label
              htmlFor="profile-picture-upload"
              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 shadow-gentle cursor-pointer flex items-center justify-center bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              <Camera className="h-4 w-4" />
            </Label>
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl text-foreground">
                  {formData.username || "Update Your Profile"}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Eco-conscious marketplace member
                </CardDescription>
                <Badge variant="secondary" className="mt-2 bg-eco-sage text-eco-green border-eco-accent">
                  <Leaf className="mr-1 h-3 w-3" />
                  Verified Eco-User
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center gap-2 text-foreground font-medium">
                  <User className="h-4 w-4 text-eco-green" />
                  Username
                </Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  className="bg-background border-eco-accent focus:border-eco-green focus:ring-eco-green/20"
                  placeholder="Enter your username"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-foreground font-medium">
                  <Mail className="h-4 w-4 text-eco-green" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  readOnly
                  className="bg-muted border-eco-accent focus:border-eco-green focus:ring-eco-green/20"
                  placeholder="Enter your email"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2 text-foreground font-medium">
                  <Phone className="h-4 w-4 text-eco-green" />
                  Phone Number
                  <span className="text-xs text-muted-foreground">(max 12 digits)</span>
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="bg-background border-eco-accent focus:border-eco-green focus:ring-eco-green/20"
                  placeholder="Enter your phone number"
                  maxLength={12}
                />
                {formData.phone && (
                  <p className="text-xs text-muted-foreground">
                    {formData.phone.length}/12 digits
                  </p>
                )}
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2 text-foreground font-medium">
                  <MapPin className="h-4 w-4 text-eco-green" />
                  Location
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="bg-background border-eco-accent focus:border-eco-green focus:ring-eco-green/20"
                  placeholder="Enter your city, state, or region"
                />
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio" className="flex items-center gap-2 text-foreground font-medium">
                  <Leaf className="h-4 w-4 text-eco-green" />
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  className="bg-background border-eco-accent focus:border-eco-green focus:ring-eco-green/20 min-h-[100px] resize-none"
                  placeholder="Tell us about your eco-friendly journey..."
                  maxLength={200}
                />
                <p className="text-xs text-muted-foreground">
                  {formData.bio.length}/200 characters
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-eco hover:opacity-90 text-white font-medium shadow-eco transition-all duration-300 hover:shadow-lg"
                  disabled={isLoading}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1 border-eco-accent text-foreground hover:bg-eco-sage hover:text-eco-green transition-eco"
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            🌱 Building a more sustainable future together
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;