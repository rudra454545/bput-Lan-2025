import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Trophy, Calendar, Users, Zap, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown to BR tournament (Nov 8, 2025)
  useEffect(() => {
    const eventDate = new Date("2025-11-08T10:00:00");

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full mb-8 glow-primary">
            <Zap className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm font-bold uppercase tracking-wider">BPUT Gaming Tournament 2025</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="gradient-text">FREE FIRE</span>
            <br />
            <span className="text-foreground">LAN EVENT</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            A free friendly tournament organized by BPUT FF Committee
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to="/register">
              <Button variant="hero" size="lg" className="w-full sm:w-auto">
                <UserPlus className="w-5 h-5" />
                Register Now
              </Button>
            </Link>
            <Link to="/schedule">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Calendar className="w-5 h-5" />
                View Schedule
              </Button>
            </Link>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div variants={itemVariants} className="glass-lg rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-6 font-bold">
              Event Starts In
            </h3>
            <div className="grid grid-cols-4 gap-4 md:gap-8">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item, index) => (
                <div key={item.label} className="glass rounded-xl p-4 md:p-6 card-3d hover-glow-primary">
                  <div className="text-4xl md:text-6xl font-black gradient-text mb-2">
                    {item.value.toString().padStart(2, "0")}
                  </div>
                  <div className="text-xs md:text-sm uppercase tracking-wider text-muted-foreground font-semibold">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
