import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Settings, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  Edit3
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "" 
  });
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app this would connect to Supabase
    if (loginForm.email && loginForm.password) {
      setIsLoggedIn(true);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock signup - in real app this would connect to Supabase
    if (signupForm.password !== signupForm.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Password mismatch",
        description: "Please make sure your passwords match.",
      });
      return;
    }
    
    if (signupForm.name && signupForm.email && signupForm.password) {
      setIsLoggedIn(true);
      toast({
        title: "Account created!",
        description: "Welcome to NewsApp! Your account has been created successfully.",
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginForm({ email: "", password: "" });
    setSignupForm({ name: "", email: "", password: "", confirmPassword: "" });
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pb-20 md:pb-4">
          <section className="news-gradient py-8">
            <div className="container mx-auto px-4 text-center">
              <div className="w-16 h-16 mx-auto primary-gradient rounded-2xl flex items-center justify-center mb-4">
                <User className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Join NewsApp
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Sign in to save your favorite articles and personalize your news experience
              </p>
            </div>
          </section>

          <div className="container mx-auto px-4 py-8">
            <Card className="max-w-md mx-auto p-6">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full primary-gradient">
                      Login
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={signupForm.name}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={signupForm.email}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a password"
                        value={signupForm.password}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        value={signupForm.confirmPassword}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full primary-gradient">
                      Create Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </main>

        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pb-20 md:pb-4">
        {/* Profile Header */}
        <section className="news-gradient py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 max-w-2xl mx-auto">
              <Avatar className="h-20 w-20">
                <AvatarImage src="" alt="Profile" />
                <AvatarFallback className="text-2xl primary-gradient text-white">
                  {signupForm.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold mb-1">
                  {signupForm.name || "User"}
                </h1>
                <p className="text-muted-foreground mb-2">
                  {signupForm.email || loginForm.email}
                </p>
                <Badge className="primary-gradient text-white">Premium Member</Badge>
              </div>
              
              <Button variant="ghost" size="icon">
                <Edit3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">12</p>
              <p className="text-sm text-muted-foreground">Favorites</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">48</p>
              <p className="text-sm text-muted-foreground">Articles Read</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">7</p>
              <p className="text-sm text-muted-foreground">Days Active</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">5</p>
              <p className="text-sm text-muted-foreground">Categories</p>
            </Card>
          </div>

          {/* Settings Menu */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Settings & Preferences</h3>
            <div className="space-y-3">
              {[
                { icon: Bell, label: "Notifications", desc: "Manage your notification preferences" },
                { icon: Shield, label: "Privacy & Security", desc: "Control your data and privacy settings" },
                { icon: Settings, label: "App Settings", desc: "Customize your app experience" },
                { icon: HelpCircle, label: "Help & Support", desc: "Get help and contact support" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors">
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Logout Button */}
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="w-full gap-2 text-destructive hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};