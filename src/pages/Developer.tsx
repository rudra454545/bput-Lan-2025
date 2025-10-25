import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Github, Linkedin, Instagram, Mail, Code, Database, Zap } from "lucide-react";
import { motion } from "framer-motion";

const Developer = () => {
  const techStack = [
    { name: "Next.js", category: "Frontend Framework" },
    { name: "TypeScript", category: "Language" },
    { name: "React", category: "UI Library" },
    { name: "TailwindCSS", category: "Styling" },
    { name: "GSAP", category: "Animations" },
    { name: "Framer Motion", category: "Animations" },
    { name: "Supabase", category: "Backend" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Vercel", category: "Deployment" },
  ];

  const analytics = [
    { label: "Lines of Code", value: "15,000+", icon: Code },
    { label: "Development Duration", value: "6-8 weeks", icon: Zap },
    { label: "Features", value: "50+", icon: Database },
    { label: "Performance Score", value: "95+", icon: Zap },
  ];

  return (
    <div className="min-h-screen relative">
      <Navigation />
      <main className="pt-24 pb-16 container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              <span className="gradient-text">About Developer</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Built with passion for gaming and technology
            </p>
          </div>

          {/* Developer Profile */}
          <div className="glass-lg rounded-2xl p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-48 h-48 rounded-2xl glass overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                  <Code className="w-24 h-24 text-primary" />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-4xl font-black mb-2">Your Name</h2>
                <p className="text-xl text-primary mb-4">Full-Stack Developer</p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Passionate about creating immersive gaming experiences and building robust web applications.
                  Specialized in modern web technologies and gaming tournament platforms.
                </p>

                <div className="flex justify-center md:justify-start gap-4">
                  <a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass w-12 h-12 rounded-lg flex items-center justify-center hover-glow-primary"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://linkedin.com/in/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass w-12 h-12 rounded-lg flex items-center justify-center hover-glow-primary"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://instagram.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass w-12 h-12 rounded-lg flex items-center justify-center hover-glow-primary"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="mailto:your.email@example.com"
                    className="glass w-12 h-12 rounded-lg flex items-center justify-center hover-glow-primary"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="glass-lg rounded-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold mb-8 text-center">
              <span className="gradient-text">Tech Stack</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="glass rounded-xl p-4 card-3d hover-glow-primary text-center"
                >
                  <div className="text-xl font-bold mb-1">{tech.name}</div>
                  <div className="text-xs text-muted-foreground">{tech.category}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Analytics */}
          <div className="glass-lg rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-8 text-center">
              <span className="gradient-text">Project Analytics</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {analytics.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary/20 flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl font-black gradient-text mb-2">{item.value}</div>
                  <div className="text-sm text-muted-foreground">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Developer;
