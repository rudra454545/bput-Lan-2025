import { Link } from "react-router-dom";
import { Trophy, Mail, MapPin, Phone, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", path: "/" },
        { name: "Schedule", path: "/schedule" },
        { name: "Points Table", path: "/points" },
        { name: "Register", path: "/register" },
      ],
    },
    {
      title: "Information",
      links: [
        { name: "About Event", path: "/#about" },
        { name: "Rules & Guidelines", path: "/rules" },
        { name: "FAQs", path: "/faq" },
        { name: "Contact Us", path: "/contact" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Youtube, href: "https://youtube.com", label: "Youtube" },
  ];

  return (
    <footer className="relative border-t border-primary/20 mt-24">
      <div className="glass-lg">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <div>
              <Link to="/" className="flex items-center gap-3 mb-6 group">
                <div className="relative">
                  <Trophy className="w-10 h-10 text-primary" />
                  <div className="absolute inset-0 blur-xl bg-primary/30 group-hover:bg-primary/50 transition-all" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold gradient-text">BPUT FF</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">LAN Event</span>
                </div>
              </Link>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Join the ultimate Free Fire LAN tournament experience at BPUT. Compete, win, and become a legend.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass w-10 h-10 rounded-lg flex items-center justify-center hover-glow-primary group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="text-lg font-bold mb-6 text-foreground">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                      >
                        <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Section */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-foreground">Contact Info</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>BPUT Campus, Rourkela, Odisha, India</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <a href="mailto:bputfflan@gmail.com" className="hover:text-primary transition-colors">
                    bputfflan@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <a href="tel:+919876543210" className="hover:text-primary transition-colors">
                    +91 98765 43210
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground text-center md:text-left">
                © {currentYear} BPUT Free Fire LAN Event. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
