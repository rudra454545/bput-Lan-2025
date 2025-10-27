import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Trophy, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

const Points = () => {
  const [brTeams, setBrTeams] = useState<any[]>([]);
  const [csTeams, setCsTeams] = useState<any[]>([]);
  const [brPlayers, setBrPlayers] = useState<any[]>([]);
  const [csPlayers, setCsPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();

    // Real-time subscriptions
    const brScoresChannel = supabase
      .channel('br-scores-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'match_scores_br' }, () => {
        fetchData();
      })
      .subscribe();

    const csScoresChannel = supabase
      .channel('cs-scores-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'match_scores_cs' }, () => {
        fetchData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(brScoresChannel);
      supabase.removeChannel(csScoresChannel);
    };
  }, []);

  const fetchData = async () => {
    setLoading(true);

    // Fetch BR team standings
    const { data: brData } = await supabase
      .from("match_scores_br")
      .select(`
        *,
        teams:team_id (team_name, unique_team_id, team_logo_url)
      `);
    
    // Sort by booyah (priority), then position points, then total points
    const sortedBrData = (brData || []).sort((a, b) => {
      if (b.booyah !== a.booyah) return b.booyah - a.booyah;
      if (b.total_standing_points !== a.total_standing_points) return b.total_standing_points - a.total_standing_points;
      return b.total_points - a.total_points;
    });

    // Fetch CS team standings
    const { data: csData } = await supabase
      .from("match_scores_cs")
      .select(`
        *,
        teams:team_id (team_name, unique_team_id, team_logo_url)
      `)
      .order("total_points", { ascending: false });

    // Fetch BR top players
    const { data: brPlayersData } = await supabase
      .from("player_stats_br")
      .select(`
        *,
        profiles:user_id (full_name, unique_player_id, in_game_name),
        teams:team_id (team_name)
      `)
      .order("kills", { ascending: false })
      .limit(15);

    // Fetch CS top players
    const { data: csPlayersData } = await supabase
      .from("player_stats_cs")
      .select(`
        *,
        profiles:user_id (full_name, unique_player_id, in_game_name),
        teams:team_id (team_name)
      `)
      .order("kills", { ascending: false })
      .limit(15);

    setBrTeams(sortedBrData);
    setCsTeams(csData || []);
    setBrPlayers(brPlayersData || []);
    setCsPlayers(csPlayersData || []);
    setLoading(false);
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-400 font-black";
    if (rank === 2) return "text-gray-300 font-black";
    if (rank === 3) return "text-orange-400 font-black";
    return "";
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
            <span className="gradient-text">Points Table</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Live tournament standings and top performers
          </p>
        </motion.div>

        <Tabs defaultValue="br" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="br" className="text-base">Battle Royale</TabsTrigger>
            <TabsTrigger value="cs" className="text-base">Clash Squad</TabsTrigger>
          </TabsList>

          <TabsContent value="br" className="space-y-12">
            {/* Team Standings */}
            <div className="glass-lg rounded-2xl p-6 overflow-x-auto">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-primary" />
                Team Standings
              </h2>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4">Rank</th>
                    <th className="text-left p-4">Team</th>
                    <th className="text-center p-4">Booyah</th>
                    <th className="text-center p-4">Kill Points</th>
                    <th className="text-center p-4">Position Points</th>
                    <th className="text-center p-4">Total Points</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="text-center p-8 text-muted-foreground">
                        Loading standings...
                      </td>
                    </tr>
                  ) : brTeams.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center p-8 text-muted-foreground">
                        No match data yet. Standings will appear after first match.
                      </td>
                    </tr>
                  ) : (
                    brTeams.map((team, index) => (
                      <tr key={team.match_id} className="border-b border-border/50 hover:bg-primary/5 transition-colors">
                        <td className={`p-4 text-2xl ${getRankColor(index + 1)}`}>
                          {index + 1}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {team.teams?.team_logo_url && (
                              <img 
                                src={team.teams.team_logo_url} 
                                alt={team.teams.team_name}
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                            )}
                            <div>
                              <div className="font-bold">{team.teams?.team_name}</div>
                              <div className="text-sm text-muted-foreground">{team.teams?.unique_team_id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="text-center p-4 font-black text-yellow-400 text-xl">{team.booyah || 0}</td>
                        <td className="text-center p-4 font-bold">{team.total_kills}</td>
                        <td className="text-center p-4 font-bold">{team.total_standing_points}</td>
                        <td className="text-center p-4 text-xl font-black text-primary">{team.total_points}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Top Players */}
            <div className="glass-lg rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                Top 15 Players
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                  <div className="col-span-full text-center p-8 text-muted-foreground">
                    Loading player stats...
                  </div>
                ) : brPlayers.length === 0 ? (
                  <div className="col-span-full text-center p-8 text-muted-foreground">
                    No player stats yet. Stats will appear after first match.
                  </div>
                ) : (
                  brPlayers.map((player, index) => (
                    <div key={player.id} className="glass rounded-xl p-4 hover-glow-primary">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`text-3xl ${getRankColor(index + 1)}`}>
                          #{index + 1}
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">{player.profiles?.in_game_name}</div>
                          <div className="text-sm text-muted-foreground">{player.profiles?.unique_player_id}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          {player.teams?.team_name}
                        </div>
                        <div className="text-2xl font-black text-primary">
                          {player.kills} <span className="text-sm font-normal">kills</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cs" className="space-y-12">
            <div className="glass-lg rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                <span className="gradient-text-accent">Clash Squad Coming Soon</span>
              </h3>
              <p className="text-muted-foreground text-lg">
                Clash Squad tournament has not started yet. Check back after the tournament begins!
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Points;
