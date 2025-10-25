import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Mail, Lock, User, Phone, IdCard, Gamepad2, Upload, Trophy } from "lucide-react";
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone_number: z.string().min(10, "Phone number must be at least 10 digits"),
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  university_id: z.string().min(3, "University ID is required"),
  in_game_name: z.string().min(2, "In-game name is required"),
  game_uid: z.string().min(5, "Game UID is required"),
});

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profileFile, setProfileFile] = useState<File | null>(null);

  // Login state
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup state
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    phone_number: "",
    full_name: "",
    university_id: "",
    in_game_name: "",
    game_uid: "",
  });

  useEffect(() => {
    // Check if already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });
  }, [navigate]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form data
      signupSchema.parse(signupData);

      if (!profileFile) {
        toast({
          title: "Profile Screenshot Required",
          description: "Please upload your gaming profile screenshot",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Check if UID already exists
      const { data: existingUser } = await supabase
        .from("profiles")
        .select("game_uid")
        .eq("game_uid", signupData.game_uid)
        .maybeSingle();

      if (existingUser) {
        toast({
          title: "UID Already Registered",
          description: "This game UID is already registered. Each UID can only be used once.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Sign up user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          data: {
            phone_number: signupData.phone_number,
            full_name: signupData.full_name,
            university_id: signupData.university_id,
            in_game_name: signupData.in_game_name,
            game_uid: signupData.game_uid,
          },
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        // Upload profile screenshot
        const fileExt = profileFile.name.split(".").pop();
        const filePath = `${authData.user.id}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from("profile-screenshots")
          .upload(filePath, profileFile, { upsert: true });

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: urlData } = supabase.storage
          .from("profile-screenshots")
          .getPublicUrl(filePath);

        // Update profile with screenshot URL
        const { error: updateError } = await supabase
          .from("profiles")
          .update({ profile_screenshot_url: urlData.publicUrl })
          .eq("id", authData.user.id);

        if (updateError) throw updateError;

        // Get the unique player ID
        const { data: profileData } = await supabase
          .from("profiles")
          .select("unique_player_id")
          .eq("id", authData.user.id)
          .single();

        toast({
          title: "🎮 Registration Successful!",
          description: `Hi Gamer! You are successfully registered to BPUT FF LAN EVENT. Your Unique ID: ${profileData?.unique_player_id}`,
          duration: 8000,
        });

        // Redirect to login
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: "Signup Failed",
        description: error.message || "An error occurred during signup",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if identifier is email or unique player ID
      const isEmail = loginIdentifier.includes("@");
      
      let email = loginIdentifier;
      
      if (!isEmail) {
        // Fetch email from unique player ID
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("email")
          .eq("unique_player_id", loginIdentifier)
          .maybeSingle();

        if (profileError || !profileData) {
          throw new Error("Invalid Player ID");
        }

        email = profileData.email;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: loginPassword,
      });

      if (error) throw error;

      if (data.session) {
        toast({
          title: "Login Successful!",
          description: "Welcome back, gamer!",
        });
        navigate("/");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-12 h-12 text-primary animate-float" />
            <h1 className="text-4xl md:text-5xl font-black gradient-text">BPUT FF</h1>
          </div>
          <p className="text-muted-foreground text-lg">LAN EVENT 2025</p>
        </div>

        <Tabs defaultValue="login" className="glass-lg rounded-2xl p-8">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login" className="text-base">Login</TabsTrigger>
            <TabsTrigger value="signup" className="text-base">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label htmlFor="loginIdentifier" className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4" />
                  Email or Player ID
                </Label>
                <Input
                  id="loginIdentifier"
                  type="text"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="email@example.com or BPUT-FF-0001"
                  required
                  className="glass"
                />
              </div>

              <div>
                <Label htmlFor="loginPassword" className="flex items-center gap-2 mb-2">
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <Input
                  id="loginPassword"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="glass"
                />
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Forgot password?{" "}
                <a href="/forgot-password" className="text-primary hover:underline">
                  Reset here
                </a>
              </p>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="full_name" className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </Label>
                  <Input
                    id="full_name"
                    value={signupData.full_name}
                    onChange={(e) => setSignupData({ ...signupData, full_name: e.target.value })}
                    placeholder="John Doe"
                    required
                    className="glass"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    placeholder="email@example.com"
                    required
                    className="glass"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone_number" className="flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone_number"
                    value={signupData.phone_number}
                    onChange={(e) => setSignupData({ ...signupData, phone_number: e.target.value })}
                    placeholder="9876543210"
                    required
                    className="glass"
                  />
                </div>

                <div>
                  <Label htmlFor="university_id" className="flex items-center gap-2 mb-2">
                    <IdCard className="w-4 h-4" />
                    University ID
                  </Label>
                  <Input
                    id="university_id"
                    value={signupData.university_id}
                    onChange={(e) => setSignupData({ ...signupData, university_id: e.target.value })}
                    placeholder="BPUT/2023/001"
                    required
                    className="glass"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="in_game_name" className="flex items-center gap-2 mb-2">
                    <Gamepad2 className="w-4 h-4" />
                    In-Game Name
                  </Label>
                  <Input
                    id="in_game_name"
                    value={signupData.in_game_name}
                    onChange={(e) => setSignupData({ ...signupData, in_game_name: e.target.value })}
                    placeholder="GamerXYZ"
                    required
                    className="glass"
                  />
                </div>

                <div>
                  <Label htmlFor="game_uid" className="flex items-center gap-2 mb-2">
                    <Trophy className="w-4 h-4" />
                    Game UID
                  </Label>
                  <Input
                    id="game_uid"
                    value={signupData.game_uid}
                    onChange={(e) => setSignupData({ ...signupData, game_uid: e.target.value })}
                    placeholder="1234567890"
                    required
                    className="glass"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="flex items-center gap-2 mb-2">
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  placeholder="Minimum 8 characters"
                  required
                  className="glass"
                />
              </div>

              <div>
                <Label htmlFor="profileFile" className="flex items-center gap-2 mb-2">
                  <Upload className="w-4 h-4" />
                  Profile Screenshot (JPG)
                </Label>
                <Input
                  id="profileFile"
                  type="file"
                  accept=".jpg,.jpeg"
                  onChange={(e) => setProfileFile(e.target.files?.[0] || null)}
                  required
                  className="glass"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Upload screenshot of your Free Fire profile
                </p>
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
                {loading ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Auth;
