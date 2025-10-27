import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Users, Trophy, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [pendingTeams, setPendingTeams] = useState<any[]>([]);
  const [verifiedTeams, setVerifiedTeams] = useState<any[]>([]);

  useEffect(() => {
    checkAdminAuth();
  }, []);

  const checkAdminAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session || session.user.email !== "tech.obscuragroups@gmail.com") {
      toast({
        title: "Access Denied",
        description: "You do not have admin privileges",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    fetchTeams();
  };

  const fetchTeams = async () => {
    setLoading(true);

    // Fetch pending teams
    const { data: pendingData } = await supabase
      .from("teams")
      .select(`
        *,
        profiles:igl_user_id (full_name, email),
        team_members (
          id,
          profiles:user_id (full_name, unique_player_id)
        )
      `)
      .eq("is_verified", false);

    // Fetch verified teams
    const { data: verifiedData } = await supabase
      .from("teams")
      .select(`
        *,
        profiles:igl_user_id (full_name, email),
        team_members (
          id,
          profiles:user_id (full_name, unique_player_id)
        )
      `)
      .eq("is_verified", true);

    setPendingTeams(pendingData || []);
    setVerifiedTeams(verifiedData || []);
    setLoading(false);
  };

  const handleApproveTeam = async (team: any) => {
    const { error } = await supabase
      .from("teams")
      .update({ is_verified: true })
      .eq("team_id", team.team_id);

    if (error) {
      console.error("Error approving team:", error);
      toast({
        title: "Error",
        description: "Failed to approve team",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Team Approved",
      description: "Team has been verified successfully",
    });

    // Refresh data from database to ensure UI is in sync
    fetchTeams();
  };

  const handleRejectTeam = async (team: any) => {
    const { error } = await supabase
      .from("teams")
      .delete()
      .eq("team_id", team.team_id);

    if (error) {
      console.error("Error rejecting team:", error);
      toast({
        title: "Error",
        description: "Failed to reject team",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Team Rejected",
      description: "Team registration has been rejected",
    });

    // Refresh data from database to ensure UI is in sync
    fetchTeams();
  };

  if (loading) {
    return (
      <div className="min-h-screen relative">
        <Navigation />
        <main className="pt-24 pb-16 container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading admin panel...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
              <span className="gradient-text">Admin Panel</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage tournament registrations and data
            </p>
          </div>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass-lg rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <div className="text-3xl font-black">{pendingTeams.length}</div>
                  <div className="text-sm text-muted-foreground">Pending Verification</div>
                </div>
              </div>
            </div>

            <div className="glass-lg rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-3xl font-black">{verifiedTeams.length}</div>
                  <div className="text-sm text-muted-foreground">Verified Teams</div>
                </div>
              </div>
            </div>

            <div className="glass-lg rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <div className="text-3xl font-black">{pendingTeams.length + verifiedTeams.length}</div>
                  <div className="text-sm text-muted-foreground">Total Registrations</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Teams */}
          <div className="glass-lg rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-yellow-500" />
              Pending Verification
            </h2>

            {pendingTeams.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>No pending team registrations</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingTeams.map((team) => (
                  <div key={team.team_id} className="glass rounded-xl p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        {team.team_logo_url && (
                          <img 
                            src={team.team_logo_url}
                            alt={team.team_name}
                            className="w-16 h-16 rounded-xl object-cover"
                          />
                        )}
                        <div>
                          <h3 className="text-xl font-bold">{team.team_name}</h3>
                          <p className="text-sm text-muted-foreground">{team.unique_team_id}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            IGL: {team.profiles?.full_name} ({team.profiles?.email})
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Members: {team.team_members?.length || 0} players
                          </p>
                          <div className="flex gap-2 mt-2">
                            {team.br_mode && <span className="glass-sm px-2 py-1 rounded text-xs">BR</span>}
                            {team.cs_mode && <span className="glass-sm px-2 py-1 rounded text-xs">CS</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="hero"
                          size="sm"
                          onClick={() => handleApproveTeam(team)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRejectTeam(team)}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Verified Teams */}
          <div className="glass-lg rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              Verified Teams
            </h2>

            {verifiedTeams.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>No verified teams yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {verifiedTeams.map((team) => (
                  <div key={team.team_id} className="glass rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      {team.team_logo_url && (
                        <img 
                          src={team.team_logo_url}
                          alt={team.team_name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-bold">{team.team_name}</h3>
                        <p className="text-xs text-muted-foreground">{team.unique_team_id}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {team.team_members?.length || 0} members
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPanel;
