import { motion } from "framer-motion";

interface SocialIconProps {
  icon: React.ReactNode;
  name: string;
  href: string;
  color: string;
  username: string;
  followers: string;
  initials: string;
}

const SocialIcon = ({ icon, name, href, color, username, followers, initials }: SocialIconProps) => {
  return (
    <div className="relative group">
      {/* Tooltip */}
      <motion.div 
        className="absolute left-1/2 -translate-x-1/2 top-0 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:-top-[150px] transition-all duration-300 z-50"
      >
        <div className="glass-lg rounded-2xl p-4 border" style={{ borderColor: color }}>
          <div className="flex gap-3 mb-2">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg bg-background border"
              style={{ borderColor: color, color: color }}
            >
              {initials}
            </div>
            <div className="flex flex-col justify-center text-foreground">
              <div className="font-bold text-sm" style={{ color: color }}>{name}</div>
              <div className="text-xs text-muted-foreground">{username}</div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">{followers}</div>
        </div>
      </motion.div>

      {/* Icon Button */}
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative"
      >
        <div className="w-14 h-14 relative group-hover:rotate-[-35deg] group-hover:skew-y-[20deg] transition-transform duration-300">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className="absolute inset-0 border rounded-lg transition-all duration-300"
              style={{ 
                borderColor: color,
                opacity: 0,
                transform: 'translate(0, 0)'
              }}
            />
          ))}
          <span 
            className="absolute inset-0 flex items-center justify-center rounded-lg bg-background"
            style={{ fill: color, color: color }}
          >
            {icon}
          </span>
        </div>
        <div 
          className="absolute left-1/2 -translate-x-1/2 bottom-0 opacity-0 group-hover:opacity-100 group-hover:bottom-[-35px] transition-all duration-300 font-medium text-sm whitespace-nowrap"
          style={{ color: color }}
        >
          {name}
        </div>
      </a>

      <style>{`
        a:hover .w-14 span:nth-child(1) {
          opacity: 0.2;
        }
        a:hover .w-14 span:nth-child(2) {
          opacity: 0.4;
          transform: translate(5px, -5px);
        }
        a:hover .w-14 span:nth-child(3) {
          opacity: 0.6;
          transform: translate(10px, -10px);
        }
        a:hover .w-14 span:nth-child(4) {
          opacity: 0.8;
          transform: translate(15px, -15px);
        }
        a:hover .w-14 span:nth-child(5) {
          opacity: 1;
          transform: translate(20px, -20px);
        }
      `}</style>
    </div>
  );
};

export default SocialIcon;
