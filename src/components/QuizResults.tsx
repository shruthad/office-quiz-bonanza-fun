import { Team } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Trophy, RotateCcw } from "lucide-react";
import { useEffect } from "react";

interface QuizResultsProps {
  teams: Team[];
  onRestart: () => void;
}

export const QuizResults = ({ teams, onRestart }: QuizResultsProps) => {
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
  const winner = sortedTeams[0];
  const losers = sortedTeams.slice(1);

  useEffect(() => {
    // Add celebration animation to winner side
    const celebrationInterval = setInterval(() => {
      createFirework();
    }, 500);

    // Create multiple initial fireworks
    for (let i = 0; i < 5; i++) {
      setTimeout(() => createFirework(), i * 200);
    }

    return () => clearInterval(celebrationInterval);
  }, []);

  const createFirework = () => {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.cssText = `
      position: absolute;
      width: 6px;
      height: 6px;
      background: hsl(var(--accent));
      border-radius: 50%;
      animation: firework 1s ease-out forwards;
      left: ${Math.random() * 40 + 5}%;
      top: ${Math.random() * 40 + 10}%;
      box-shadow: 0 0 10px hsl(var(--accent));
    `;
    
    const winnerSide = document.querySelector('.winner-side');
    if (winnerSide) {
      winnerSide.appendChild(firework);
      setTimeout(() => firework.remove(), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
          🎉 Quiz Complete! 🎉
        </h1>
        <Button
          onClick={onRestart}
          className="flex items-center gap-2 mx-auto"
          size="lg"
        >
          <RotateCcw className="w-5 h-5" />
          Start New Quiz
        </Button>
      </div>

      {/* Results Split View */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh]">
        {/* Winner Side */}
        <div className="winner-side relative overflow-hidden bg-gradient-to-br from-accent/20 to-gold/30 border-r border-accent/30 flex flex-col items-center justify-center p-8">
          <div className="text-center z-10 relative">
            <Trophy className="w-20 h-20 text-gold mx-auto mb-6 animate-celebration" />
            <h2 className="text-3xl font-bold text-accent mb-4">
              🏆 WINNER! 🏆
            </h2>
            <div 
              className="text-4xl font-bold mb-4 animate-pulse-glow"
              style={{ 
                color: `hsl(var(--team-${winner.color}))`,
                textShadow: `0 0 20px hsl(var(--team-${winner.color}) / 0.5)`
              }}
            >
              {winner.name}
            </div>
            <div className="text-6xl font-bold text-gold animate-score-bounce mb-4">
              {winner.score}
            </div>
            <div className="text-lg text-accent font-semibold">
              🎊 Congratulations! 🎊
            </div>
          </div>
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-4 h-4 bg-gold rounded-full animate-celebration opacity-70"></div>
            <div className="absolute top-20 right-20 w-3 h-3 bg-accent rounded-full animate-celebration opacity-60" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute bottom-20 left-20 w-5 h-5 bg-gold rounded-full animate-celebration opacity-50" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-10 right-10 w-3 h-3 bg-accent rounded-full animate-celebration opacity-80" style={{animationDelay: '1.5s'}}></div>
          </div>
        </div>

        {/* Losers Side */}
        <div className="bg-gradient-to-br from-muted/30 to-muted/50 flex flex-col items-center justify-center p-8">
          <div className="text-center">
            <div className="text-6xl mb-6">😔</div>
            <h2 className="text-2xl font-bold text-muted-foreground mb-6">
              Better Luck Next Time!
            </h2>
            
            <div className="space-y-4 max-w-md">
              {losers.map((team, index) => (
                <div 
                  key={team.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl font-bold text-muted-foreground">
                      #{index + 2}
                    </div>
                    <div>
                      <div 
                        className="font-bold"
                        style={{ color: `hsl(var(--team-${team.color}))` }}
                      >
                        {team.name}
                      </div>
                    </div>
                  </div>
                  <div className="text-xl font-bold text-muted-foreground">
                    {team.score}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-muted-foreground">
              Keep practicing and you'll get them next time! 💪
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes firework {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(3);
            opacity: 0.8;
          }
          100% {
            transform: scale(6);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};