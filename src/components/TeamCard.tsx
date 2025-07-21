import { Team, TEAM_GRADIENTS } from "@/types/quiz";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TeamCardProps {
  team: Team;
  isActive?: boolean;
  showScore?: boolean;
  onClick?: () => void;
}

export const TeamCard = ({ team, isActive, showScore = true, onClick }: TeamCardProps) => {
  return (
    <Card 
      className={cn(
        "relative overflow-hidden cursor-pointer transition-all duration-300 border-2",
        "hover:scale-105 hover:shadow-lg",
        isActive && "animate-pulse-glow ring-2 ring-primary/50"
      )}
      onClick={onClick}
      style={{
        background: TEAM_GRADIENTS[team.color],
        borderColor: `hsl(var(--team-${team.color}))`,
      }}
    >
      <div className="p-6 text-center text-white relative z-10">
        <h3 className="text-xl font-bold mb-2 drop-shadow-lg">
          {team.name}
        </h3>
        {showScore && (
          <div className="text-3xl font-bold drop-shadow-lg animate-slide-up">
            {team.score}
          </div>
        )}
      </div>
      {isActive && (
        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
      )}
    </Card>
  );
};