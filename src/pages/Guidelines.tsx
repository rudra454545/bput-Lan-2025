import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { BookOpen, Users, Trophy, Shield, Clock, AlertCircle } from "lucide-react";

const Guidelines = () => {
  const guidelines = [
    {
      icon: Users,
      title: "Team Requirements",
      items: [
        "Each team must have 4-5 players registered",
        "One IGL (In-Game Leader) must be designated",
        "All players must be BPUT students with valid university ID",
        "Team name must be unique and appropriate",
      ],
    },
    {
      icon: Shield,
      title: "Registration Rules",
      items: [
        "Registration deadline: Check countdown on home page",
        "Maximum 12 teams allowed (first come, first served)",
        "Each player can only join ONE team",
        "Profile screenshot (JPEG) required for verification",
        "Valid Game UID and In-Game Name mandatory",
      ],
    },
    {
      icon: Trophy,
      title: "Tournament Format",
      items: [
        "Both BR (Battle Royale) and CS (Clash Squad) modes",
        "Points system: Kills + Standing Points",
        "Multiple rounds for each mode",
        "Top teams qualify for finals",
        "Winners announced after final round",
      ],
    },
    {
      icon: Clock,
      title: "Match Schedule",
      items: [
        "Check Schedule page for match timings",
        "Be online 15 minutes before match time",
        "Room ID and password shared 10 minutes before",
        "Late entries may result in disqualification",
      ],
    },
    {
      icon: AlertCircle,
      title: "Important Rules",
      items: [
        "No hacking, cheating, or glitches allowed",
        "Fair play and sportsmanship expected",
        "Admin decisions are final",
        "Toxic behavior leads to disqualification",
        "This is a free friendly tournament - have fun!",
      ],
    },
    {
      icon: BookOpen,
      title: "Point System",
      items: [
        "BR Mode: Position points + Kill points",
        "CS Mode: Round wins + Kill points",
        "Detailed scoring visible on Points page",
        "Real-time leaderboard updates",
        "Top players get special recognition",
      ],
    },
  ];

  return (
    <div className="min-h-screen relative">
      <Navigation />
      <main className="pt-24 pb-16 container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              <span className="gradient-text">Tournament Guidelines</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Read carefully before registering your team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guidelines.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-lg rounded-2xl p-6 card-3d hover-glow-primary"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-primary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="glass-lg rounded-2xl p-8 mt-8 text-center"
          >
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              Need Help?
            </h3>
            <p className="text-muted-foreground mb-4">
              For any queries or clarifications, contact the BPUT FF Committee
            </p>
            <p className="text-primary font-semibold">
              Email: tech.obscuragroups@gmail.com
            </p>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Guidelines;
