import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Leaf, Mail, Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";


const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    // Email regex: must contain @ and a valid domain
  const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // Password regex: min 8 chars, uppercase, lowercase, number, special char

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
    const { id, value } = e.target;
    if (id === "email") {
    setEmailError(emailRegex.test(value) ? "" : "Enter a valid email (e.g. user@example.com)");
  }

  if (id === "password") {
    setPasswordError(
      passwordRegex.test(value)
        ? ""
        : "Password must be at least 8 characters, including uppercase, number & special char"
    );
  }

  if (id === "confirmPassword") {
    setConfirmPasswordError(
      value === formData.password ? "" : "Passwords do not match"
    );
  }
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!emailRegex.test(formData.email)) {
    toast({
      title: "Invalid Email",
      description: "Please enter a valid email (e.g. user@example.com).",
      variant: "destructive",
    });
    return;
  }

  if (!passwordRegex.test(formData.password)) {
    toast({
      title: "Enni Saarlu Cheppal Ra NIGGA",
      description:
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      variant: "destructive",
    });
    return;
  }

    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
  setIsLoading(true);  // move this to the top

  try {
    const response = await axios.post('http://localhost:3001/api/auth/signup', formData);
    console.log(response);

    toast({
      title: "Account Created!",
      description: "Welcome to EcoHaven. Please sign in.",
    });
    navigate("/login");
  } catch (err) {
    console.error(err);
    toast({
      title: "Signup Failed",
      description: "Something went wrong. Try again.",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-earth-beige to-eco-green-light">
      <div className="flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <Leaf className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Join EcoHaven</CardTitle>
            <CardDescription>
              Create your account to start shopping sustainably
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"} //imp
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                  <button type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-primary"
                  >             
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {passwordError && (
                 <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"} //imp
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                  <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-muted-foreground"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {confirmPasswordError && <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-eco-green-dark hover:from-eco-green-dark hover:to-primary transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <Button
                  variant="link"
                  className="p-0 h-auto text-primary hover:text-eco-green-dark"
                  onClick={() => navigate("/login")}
                >
                  Sign in here
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
