import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, Clock, Trophy, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const Schedule = () => {
  // Dummy schedule data for 18 BR matches
  const brMatches = Array.from({ length: 18 }, (_, i) => ({
    matchNumber: i + 1,
    date: i < 9 ? "November 8, 2025" : "November 9, 2025",
    time: i < 9 ? `${10 + Math.floor(i / 3)}:${(i % 3) * 20} AM` : `${10 + Math.floor((i - 9) / 3)}:${((i - 9) % 3) * 20} AM`,
    status: "scheduled" as const,
    map: ["Bermuda", "Purgatory", "Kalahari"][i % 3],
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen relative">
      <Navigation />
      <main className="pt-24 pb-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="gradient-text">Match Schedule</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            BPUT Free Fire LAN Event 2025 - Battle Royale Tournament
          </p>
        </motion.div>

        {/* BR Matches Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {brMatches.map((match) => (
            <motion.div
              key={match.matchNumber}
              variants={cardVariants}
              className="glass rounded-2xl p-6 card-3d hover-glow-primary"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  <h3 className="text-2xl font-bold">Match {match.matchNumber}</h3>
                </div>
                <span className="glass-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-primary">
                  {match.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{match.date}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{match.time}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{match.map}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">Mode:</span> Battle Royale
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CS Notice */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-lg rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">
            <span className="gradient-text-accent">Clash Squad Schedule</span>
          </h3>
          <p className="text-muted-foreground text-lg">
            Clash Squad tournament schedule will be announced soon. Stay tuned for updates!
          </p>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Schedule;
