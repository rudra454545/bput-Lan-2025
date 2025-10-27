import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Trophy, Plus, X, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { BackgroundPaths } from "@/components/BackgroundPaths";

const Register = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamLogo, setTeamLogo] = useState<File | null>(null);
  const [brMode, setBrMode] = useState(false);
  const [csMode, setCsMode] = useState(false);
  const [players, setPlayers] = useState([
    { playerId: "", roles: [], isIGL: false },
    { playerId: "", roles: [], isIGL: false },
    { playerId: "", roles: [], isIGL: false },
    { playerId: "", roles: [], isIGL: false },
  ]);
  const [showFifthPlayer, setShowFifthPlayer] = useState(false);

  // Registration deadline check
  const registrationDeadline = new Date("2025-11-05T17:00:00");
  const isRegistrationOpen = new Date() < registrationDeadline;

  const roleOptions = ["rusher", "flanker", "sniper", "supporter"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isRegistrationOpen) {
      toast({
        title: "Registration Closed",
        description: "Registration deadline has passed (Nov 5, 5 PM)",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Coming Soon!",
      description: "Team registration functionality will be available soon.",
    });
  };

  return (
    <div className="min-h-screen relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <BackgroundPaths />
      </div>
      <Navigation />
      <main className="pt-24 pb-16 container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="gradient-text">Team Registration</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Register your squad for BPUT FF LAN Event 2025
          </p>
          <p className="text-lg text-destructive mt-2 font-semibold">
            Deadline: November 5, 2025, 5:00 PM
          </p>
        </motion.div>

        {!isRegistrationOpen ? (
          <div className="glass-lg rounded-2xl p-8 text-center">
            <Trophy className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Registration Closed</h2>
            <p className="text-muted-foreground text-lg">
              The registration deadline has passed. Stay tuned for future tournaments!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-lg rounded-2xl p-8 space-y-8">
            {/* Team Details */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Trophy className="w-6 h-6 text-primary" />
                Team Details
              </h2>

              <div>
                <Label htmlFor="teamName">Team Name</Label>
                <Input
                  id="teamName"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Enter team name (3-20 characters)"
                  required
                  className="glass mt-2"
                />
              </div>

              <div>
                <Label htmlFor="teamLogo">Team Logo (JPG)</Label>
                <Input
                  id="teamLogo"
                  type="file"
                  accept=".jpg,.jpeg"
                  onChange={(e) => setTeamLogo(e.target.files?.[0] || null)}
                  required
                  className="glass mt-2"
                />
              </div>

              <div className="space-y-2">
                <Label>Tournament Modes</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox checked={brMode} onCheckedChange={(checked) => setBrMode(checked as boolean)} />
                    <span>Battle Royale</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox checked={csMode} onCheckedChange={(checked) => setCsMode(checked as boolean)} />
                    <span>Clash Squad</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Player Slots */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Team Members (4-5 players)</h2>
              
              {players.map((player, index) => (
                <div key={index} className="glass rounded-xl p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold">Player {index + 1}</h3>
                    {index === 4 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setPlayers(players.slice(0, 4));
                          setShowFifthPlayer(false);
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div>
                    <Label>Unique Player ID</Label>
                    <Input
                      value={player.playerId}
                      onChange={(e) => {
                        const newPlayers = [...players];
                        newPlayers[index].playerId = e.target.value;
                        setPlayers(newPlayers);
                      }}
                      placeholder="BPUT-FF-XXXX"
                      required
                      className="glass mt-2"
                    />
                  </div>

                  <div>
                    <Label>Roles (Select multiple)</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {roleOptions.map((role) => (
                        <label key={role} className="flex items-center gap-2 cursor-pointer">
                          <Checkbox
                            checked={player.roles.includes(role)}
                            onCheckedChange={(checked) => {
                              const newPlayers = [...players];
                              if (checked) {
                                newPlayers[index].roles.push(role);
                              } else {
                                newPlayers[index].roles = newPlayers[index].roles.filter(r => r !== role);
                              }
                              setPlayers(newPlayers);
                            }}
                          />
                          <span className="capitalize">{role}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={player.isIGL}
                      onCheckedChange={(checked) => {
                        const newPlayers = players.map((p, i) => ({
                          ...p,
                          isIGL: i === index ? (checked as boolean) : false
                        }));
                        setPlayers(newPlayers);
                      }}
                    />
                    <span className="font-semibold text-primary">In-Game Leader (IGL)</span>
                  </label>
                </div>
              ))}

              {!showFifthPlayer && players.length < 5 && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setPlayers([...players, { playerId: "", roles: [], isIGL: false }]);
                    setShowFifthPlayer(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add 5th Player
                </Button>
              )}
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
              {loading ? "Registering..." : "Register Team"}
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              Your team will be verified by admin before participating in the tournament.
            </p>

            {/* WhatsApp Group Link */}
            <div className="flex justify-center pt-4">
              <a
                href="https://chat.whatsapp.com/E1e94eyrfCGAVzcq250vCn?mode=wwt"
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-xl p-4 hover-glow-primary transition-all flex items-center gap-3 group"
              >
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center group-hover:bg-green-400 transition-colors">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">Join WhatsApp Group</div>
                  <div className="text-sm text-muted-foreground">For further notifications</div>
                </div>
              </a>
            </div>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Register;
