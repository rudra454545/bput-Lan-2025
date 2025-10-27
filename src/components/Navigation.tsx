import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Trophy, Calendar, Users, UserPlus, User, LogOut, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setIsAdmin(session?.user?.email === "tech.obscuragroups@gmail.com");
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
      setIsAdmin(session?.user?.email === "tech.obscuragroups@gmail.com");
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/", icon: Trophy },
    { name: "Schedule", path: "/schedule", icon: Calendar },
    { name: "Points", path: "/points", icon: Users },
    { name: "Guidelines", path: "/guidelines", icon: Users },
    { name: "Register", path: user ? "/register" : "/auth", icon: UserPlus },
    { name: "Developer", path: "/developer", icon: User },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-lg border-b border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Trophy className="w-10 h-10 text-primary animate-float" />
              <div className="absolute inset-0 blur-xl bg-primary/30 group-hover:bg-primary/50 transition-all" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold gradient-text">BPUT FF</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">LAN Event</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <Button variant="ghost" className="gap-2 hover:text-primary transition-colors">
                  <link.icon className="w-4 h-4" />
                  {link.name}
                </Button>
              </Link>
            ))}
            
            {user ? (
              <>
                <Link to="/profile">
                  <Button variant="ghost" className="gap-2 hover:text-primary transition-colors">
                    <User className="w-4 h-4" />
                    Profile
                  </Button>
                </Link>
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="ghost" className="gap-2 hover:text-primary transition-colors">
                      <Shield className="w-4 h-4" />
                      Admin
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" onClick={handleLogout} className="gap-2 hover:text-destructive transition-colors">
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="hero" size="sm">
                  <User className="w-4 h-4" />
                  Login / Signup
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden glass p-2 rounded-lg hover-glow-primary"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 hover:text-primary transition-colors"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.name}
                  </Button>
                </Link>
              ))}

              {/* Mobile Auth Section */}
              <div className="border-t border-primary/20 pt-2 mt-2">
                {user ? (
                  <>
                    <Link to="/profile" onClick={() => setIsOpen(false)}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-2 hover:text-primary transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Button>
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setIsOpen(false)}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-2 hover:text-primary transition-colors"
                        >
                          <Shield className="w-4 h-4" />
                          Admin
                        </Button>
                      </Link>
                    )}
                    <Button
                      variant="ghost"
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full justify-start gap-2 hover:text-destructive transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <Button variant="hero" className="w-full justify-start gap-2">
                      <User className="w-4 h-4" />
                      Login / Signup
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
