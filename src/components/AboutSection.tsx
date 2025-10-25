import { Trophy, Users, Gift, Zap } from "lucide-react";
import { motion } from "framer-motion";

const AboutSection = () => {
  const features = [
    {
      icon: Trophy,
      title: "Competitive Gaming",
      description: "Experience high-stakes Free Fire matches with the best players from BPUT. Test your skills in intense LAN battles.",
    },
    {
      icon: Users,
      title: "Team Tournament",
      description: "Form your squad of 4 players and compete against other teams. Strategy, teamwork, and skill will determine the victor.",
    },
    {
      icon: Gift,
      title: "Amazing Prizes",
      description: "Win exciting prizes including cash rewards, gaming gear, and exclusive Free Fire merchandise for top performers.",
    },
    {
      icon: Zap,
      title: "LAN Experience",
      description: "Play on high-performance gaming setups with zero lag. Experience the thrill of LAN gaming at its finest.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
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
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            <span className="gradient-text">About The Event</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            BPUT Free Fire LAN Event brings together the most skilled players in an epic tournament of strategy, skill, and teamwork.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="glass rounded-2xl p-8 card-3d hover-glow-primary group"
            >
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="absolute inset-0 blur-xl bg-primary/20 group-hover:bg-primary/40 transition-all -z-10" />
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-foreground">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-lg rounded-2xl p-8 md:p-12 mt-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "100+", label: "Participants" },
              { value: "25+", label: "Teams" },
              { value: "₹50K", label: "Prize Pool" },
              { value: "3", label: "Days Event" },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-black gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm uppercase tracking-wider text-muted-foreground font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
