import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Trophy, User, Mail, Phone, IdCard, Gamepad2, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [team, setTeam] = useState<any>(null);
  const [brStats, setBrStats] = useState<any[]>([]);
  const [csStats, setCsStats] = useState<any[]>([]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    fetchProfileData(session.user.id);
  };

  const fetchProfileData = async (userId: string) => {
    setLoading(true);

    // Fetch profile
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    setProfile(profileData);

    // Fetch team info
    const { data: teamMember } = await supabase
      .from("team_members")
      .select(`
        *,
        teams (
          team_name,
          unique_team_id,
          team_logo_url,
          is_verified
        )
      `)
      .eq("user_id", userId)
      .maybeSingle();

    if (teamMember) {
      setTeam(teamMember.teams);
    }

    // Fetch BR stats
    const { data: brData } = await supabase
      .from("player_stats_br")
      .select("*")
      .eq("user_id", userId)
      .order("match_number", { ascending: true });

    setBrStats(brData || []);

    // Fetch CS stats
    const { data: csData } = await supabase
      .from("player_stats_cs")
      .select("*")
      .eq("user_id", userId)
      .order("round_number", { ascending: true });

    setCsStats(csData || []);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen relative">
        <Navigation />
        <main className="pt-24 pb-16 container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <Navigation />
      <main className="pt-24 pb-16 container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Profile Header */}
          <div className="glass-lg rounded-2xl p-8 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-32 h-32 rounded-2xl overflow-hidden glass">
                {profile?.profile_screenshot_url ? (
                  <img 
                    src={profile.profile_screenshot_url} 
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-16 h-16 text-muted-foreground" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h1 className="text-4xl font-black mb-2">{profile?.full_name}</h1>
                <p className="text-xl text-primary font-bold mb-4">{profile?.unique_player_id}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {profile?.email}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    {profile?.phone_number}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <IdCard className="w-4 h-4" />
                    {profile?.university_id}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Gamepad2 className="w-4 h-4" />
                    {profile?.in_game_name} ({profile?.game_uid})
                  </div>
                </div>

                {!profile?.is_verified && (
                  <div className="mt-4 glass-sm px-4 py-2 rounded-lg inline-block">
                    <p className="text-sm text-yellow-500 font-semibold">
                      ⚠️ Account pending admin verification
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Team Info */}
          {team && (
            <div className="glass-lg rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-primary" />
                Team Information
              </h2>
              <div className="flex items-center gap-4">
                {team.team_logo_url && (
                  <img 
                    src={team.team_logo_url}
                    alt={team.team_name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                )}
                <div>
                  <h3 className="text-xl font-bold">{team.team_name}</h3>
                  <p className="text-muted-foreground">{team.unique_team_id}</p>
                  {team.is_verified ? (
                    <span className="text-primary text-sm font-semibold">✓ Verified</span>
                  ) : (
                    <span className="text-yellow-500 text-sm font-semibold">Pending Verification</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Statistics */}
          <div className="glass-lg rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              Performance Statistics
            </h2>

            {brStats.length === 0 && csStats.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Trophy className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No match statistics yet</p>
                <p className="text-sm">Stats will appear after you play your first match</p>
              </div>
            ) : (
              <div className="space-y-6">
                {brStats.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold mb-4">Battle Royale</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left p-3">Match</th>
                            <th className="text-center p-3">Kills</th>
                          </tr>
                        </thead>
                        <tbody>
                          {brStats.map((stat) => (
                            <tr key={stat.id} className="border-b border-border/50">
                              <td className="p-3">Match {stat.match_number}</td>
                              <td className="text-center p-3 font-bold">{stat.kills}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {csStats.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold mb-4">Clash Squad</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left p-3">Round</th>
                            <th className="text-center p-3">K</th>
                            <th className="text-center p-3">D</th>
                            <th className="text-center p-3">A</th>
                            <th className="text-center p-3">K/D</th>
                          </tr>
                        </thead>
                        <tbody>
                          {csStats.map((stat) => (
                            <tr key={stat.id} className="border-b border-border/50">
                              <td className="p-3">Round {stat.round_number}</td>
                              <td className="text-center p-3 font-bold">{stat.kills}</td>
                              <td className="text-center p-3">{stat.deaths}</td>
                              <td className="text-center p-3">{stat.assists}</td>
                              <td className="text-center p-3 font-bold text-primary">
                                {stat.deaths > 0 ? (stat.kills / stat.deaths).toFixed(2) : stat.kills.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
