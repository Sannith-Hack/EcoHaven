import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

// Login.tsx

const handleSubmit = async (e) => {
    e.preventDefault();
    // Email regex: must contain @ and a valid domain
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(values.email)) {
    toast({
      title: "Invalid Email",
      description: "Please enter a valid email (e.g. user@example.com).",
      variant: "destructive",
    });
    return;
  }

  // Password regex: min 8 chars, uppercase, lowercase, number, special char
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(values.password)) {
    toast({
      title: "Weak Password",
      description:
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      variant: "destructive",
    });
    return;
  }

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/auth/login", values);

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId); // Store the userId
        login(); // update auth state
        toast({
          title: "Login Successful!",
          description: "Welcome back to EcoHaven",
        });
        navigate("/");
      }
    } catch (err) {
      toast({
        title: "Login Failed",
        description: err.response?.data?.message || "Invalid email or password.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-green-light to-earth-beige">
      <div className="flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <Leaf className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>Sign in to your EcoHaven account</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter Email"
                    className="pl-10"
                    name="email"
                    onChange={handleChanges}
                    required
                    pattern="^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$"
                    title="Enter a valid email (e.g. user@example.com)"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Enter Password"
                    className="pl-10"
                    name="password"
                    onChange={handleChanges}
                    required
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                    title="Password must have at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character"
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-eco-green-dark hover:from-eco-green-dark hover:to-primary transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Button
                  variant="link"
                  className="p-0 h-auto text-primary hover:text-eco-green-dark"
                  onClick={() => navigate("/signup")}
                >
                  Sign up here
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
