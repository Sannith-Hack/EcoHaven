import { useState } from "react";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, MapPin, Calendar, Package, Heart, Settings, Edit } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { isLoggedIn } = useAuth();
  
  // Mock user data - in a real app this would come from API/context
  const [userProfile] = useState({
    name: "P.Sannith",
    email: "sunnysunnit@gmai.com",
    location: "Warangal ,Shivanagar",
    joinDate: "Sep 2025",
    avatar: "/placeholder.svg",
    stats: {
      itemsSold: 12,
      itemsBought: 8,
      favorites: 15,
      rating: 4.8
    }
  });

  // If not logged in, redirect will be handled by the routing
  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-eco-sage/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="shadow-lg border-eco-green/20 mb-8">
            <CardHeader>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-eco-light rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-eco-green" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-eco-green rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                </div>
                <div className="text-center md:text-left flex-1">
                  <CardTitle className="text-2xl font-bold text-eco-forest mb-2">
                    {userProfile.name}
                  </CardTitle>
                  <div className="flex flex-col md:flex-row gap-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{userProfile.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{userProfile.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {userProfile.joinDate}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardHeader>
          </Card>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Stats Cards */}
            <Card className="shadow-md border-eco-green/20">
              <CardContent className="p-6 text-center">
                <Package className="w-8 h-8 text-eco-green mx-auto mb-3" />
                <div className="text-2xl font-bold text-eco-forest mb-1">
                  {userProfile.stats.itemsSold}
                </div>
                <div className="text-muted-foreground">Items Sold</div>
              </CardContent>
            </Card>

            <Card className="shadow-md border-eco-green/20">
              <CardContent className="p-6 text-center">
                <Package className="w-8 h-8 text-eco-green mx-auto mb-3" />
                <div className="text-2xl font-bold text-eco-forest mb-1">
                  {userProfile.stats.itemsBought}
                </div>
                <div className="text-muted-foreground">Items Bought</div>
              </CardContent>
            </Card>

            <Card className="shadow-md border-eco-green/20">
              <CardContent className="p-6 text-center">
                <Heart className="w-8 h-8 text-eco-green mx-auto mb-3" />
                <div className="text-2xl font-bold text-eco-forest mb-1">
                  {userProfile.stats.favorites}
                </div>
                <div className="text-muted-foreground">Favorites</div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Sections */}
          <div className="grid gap-8 md:grid-cols-2 mt-8">
            {/* Account Information */}
            <Card className="shadow-md border-eco-green/20">
              <CardHeader>
                <CardTitle className="text-eco-forest flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <p className="text-foreground">{userProfile.name}</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                  <p className="text-foreground">{userProfile.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Location</label>
                  <p className="text-foreground">{userProfile.location}</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-md border-eco-green/20">
              <CardHeader>
                <CardTitle className="text-eco-forest flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/my-listings">
                  <Button variant="outline" className="w-full justify-start">
                    <Package className="w-4 h-4 mr-2" />
                    Manage My Listings
                  </Button>
                </Link>
                <Link to="/add-product">
                  <Button variant="eco" className="w-full justify-start">
                    <Package className="w-4 h-4 mr-2" />
                    Add New Product
                  </Button>
                </Link>
                <Link to="/cart">
                  <Button variant="outline" className="w-full justify-start">
                    <Package className="w-4 h-4 mr-2" />
                    View Cart
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="w-4 h-4 mr-2" />
                  My Favorites
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Seller Rating */}
          <Card className="shadow-md border-eco-green/20 mt-8">
            <CardHeader>
              <CardTitle className="text-eco-forest">Seller Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-eco-green">
                  {userProfile.stats.rating}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-lg ${
                          star <= Math.floor(userProfile.stats.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Based on {userProfile.stats.itemsSold} completed transactions
                  </p>
                </div>
                <Badge className="bg-eco-green text-white">
                  Trusted Seller
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
