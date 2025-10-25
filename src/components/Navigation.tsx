import { Link } from "react-router-dom";
import { Menu, X, Trophy, Calendar, Users, UserPlus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/", icon: Trophy },
    { name: "Schedule", path: "/schedule", icon: Calendar },
    { name: "Points", path: "/points", icon: Trophy },
    { name: "Register", path: "/register", icon: UserPlus },
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
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
