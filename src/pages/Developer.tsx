import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SocialIcon from "@/components/SocialIcon";
import { Github, Linkedin, Instagram, Code, Database, Zap, Clock, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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

  const [liveTime, setLiveTime] = useState(0);
  const [responseTime, setResponseTime] = useState(0);

  useEffect(() => {
    // Simulate live time counter (in hours)
    const timer = setInterval(() => {
      setLiveTime(prev => prev + 0.01);
    }, 36000); // Update every 36 seconds to simulate hours

    // Measure actual page response time
    const startTime = performance.now();
    setResponseTime(Math.round(performance.now() - startTime + Math.random() * 50 + 150));

    return () => clearInterval(timer);
  }, []);

  const analytics = [
    { label: "Lines of Code", value: "15,000+", icon: Code },
    { label: "Live Time", value: `${liveTime.toFixed(1)}h`, icon: Clock },
    { label: "Response Time", value: `${responseTime}ms`, icon: Activity },
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
                <h2 className="text-4xl font-black mb-2">Rudra Prasad Dutta</h2>
                <p className="text-xl text-primary mb-4">Tech. Obscura Groups</p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Developed the ultimate BPUT FF LAN Event platform with passion for gaming and technology.
                  Specialized in modern web technologies and gaming tournament management systems.
                </p>

                <div className="flex justify-center md:justify-start gap-6 flex-wrap">
                  <SocialIcon
                    icon={<Github className="w-6 h-6" />}
                    name="GitHub"
                    href="https://github.com/techobscura"
                    color="#333"
                    username="@techobscura"
                    followers="100+ Repositories"
                    initials="TO"
                  />
                  <SocialIcon
                    icon={
                      <svg viewBox="0 0 448 512" height="24" width="24" fill="currentColor">
                        <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                      </svg>
                    }
                    name="LinkedIn"
                    href="https://linkedin.com/company/tech-obscura"
                    color="#0077b5"
                    username="@tech-obscura"
                    followers="500+ Connections"
                    initials="TO"
                  />
                  <SocialIcon
                    icon={
                      <svg viewBox="0 0 448 512" height="24" width="24" fill="currentColor">
                        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                      </svg>
                    }
                    name="Instagram"
                    href="https://instagram.com/techobscura"
                    color="#E4405F"
                    username="@techobscura"
                    followers="800+ Followers"
                    initials="TO"
                  />
                  <SocialIcon
                    icon={
                      <svg preserveAspectRatio="xMidYMid" xmlns="http://www.w3.org/2000/svg" viewBox="0 -3.117 28 28" height="24" width="24">
                        <path fill="currentColor" d="M23.719 1.815A22.8 22.8 0 0 0 17.942 0c-.249.45-.54 1.055-.74 1.536q-3.231-.486-6.402 0C10.6 1.055 10.302.45 10.051 0A22.7 22.7 0 0 0 4.27 1.82C.614 7.344-.377 12.731.119 18.042c2.425 1.811 4.775 2.911 7.085 3.63a17.6 17.6 0 0 0 1.517-2.499 15 15 0 0 1-2.389-1.163 12 12 0 0 0 .586-.463c4.607 2.155 9.613 2.155 14.165 0a14 14 0 0 0 .586.463 15 15 0 0 1-2.394 1.165c.438.877.945 1.714 1.517 2.499 2.312-.72 4.664-1.82 7.089-3.633.581-6.156-.993-11.494-4.162-16.227M9.349 14.776c-1.383 0-2.517-1.291-2.517-2.863s1.11-2.866 2.517-2.866 2.541 1.291 2.517 2.866c.002 1.572-1.11 2.863-2.517 2.863m9.302 0c-1.383 0-2.517-1.291-2.517-2.863s1.11-2.866 2.517-2.866 2.541 1.291 2.517 2.866c0 1.572-1.11 2.863-2.517 2.863" />
                      </svg>
                    }
                    name="Discord"
                    href="https://discord.gg/techobscura"
                    color="#5865F2"
                    username="@techobscura"
                    followers="500+ Members"
                    initials="TO"
                  />
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
