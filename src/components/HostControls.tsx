import { Team, Round } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Plus, 
  Minus, 
  SkipForward, 
  SkipBack, 
  RotateCcw,
  Trophy,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HostControlsProps {
  teams: Team[];
  currentRound: Round;
  currentRoundIndex: number;
  totalRounds: number;
  currentTeam: string | null;
  onUpdateScore: (teamId: string, points: number) => void;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
  onNextRound: () => void;
  onPrevRound: () => void;
  onSelectTeam: (teamId: string) => void;
  onResetGame: () => void;
}

export const HostControls = ({
  teams,
  currentRound,
  currentRoundIndex,
  totalRounds,
  currentTeam,
  onUpdateScore,
  onNextQuestion,
  onPrevQuestion,
  onNextRound,
  onPrevRound,
  onSelectTeam,
  onResetGame
}: HostControlsProps) => {
  const currentQuestion = currentRound.questions[currentRound.currentQuestion];

  return (
    <div className="space-y-4">
      {/* Navigation Controls */}
      <Card className="bg-gradient-to-r from-secondary to-secondary/80">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <RotateCcw className="w-5 h-5" />
            Navigation Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Round Navigation */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Round {currentRoundIndex + 1} of {totalRounds}
            </span>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={onPrevRound}
                disabled={currentRoundIndex === 0}
              >
                <SkipBack className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onNextRound}
                disabled={currentRoundIndex === totalRounds - 1}
              >
                <SkipForward className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Question Navigation */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Question {currentRound.currentQuestion + 1} of {currentRound.questions.length}
            </span>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={onPrevQuestion}
                disabled={currentRound.currentQuestion === 0}
              >
                <SkipBack className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onNextQuestion}
                disabled={currentRound.currentQuestion === currentRound.questions.length - 1}
              >
                <SkipForward className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Button 
            variant="destructive" 
            size="sm" 
            className="w-full"
            onClick={onResetGame}
          >
            Reset Game
          </Button>
        </CardContent>
      </Card>

      {/* Team Selection */}
      <Card className="bg-gradient-to-r from-secondary to-secondary/80">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="w-5 h-5" />
            Current Team
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {teams.map((team) => (
              <Button
                key={team.id}
                variant={currentTeam === team.id ? "default" : "outline"}
                size="sm"
                className="transition-all duration-200"
                onClick={() => onSelectTeam(team.id)}
                style={{
                  background: currentTeam === team.id ? `hsl(var(--team-${team.color}))` : undefined,
                  borderColor: `hsl(var(--team-${team.color}))`
                }}
              >
                {team.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scoring Controls */}
      <Card className="bg-gradient-to-r from-secondary to-secondary/80">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Trophy className="w-5 h-5" />
            Quick Scoring
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentQuestion && (
            <div className="text-center mb-3">
              <span className="text-sm text-muted-foreground">Current Question Worth:</span>
              <div className="text-xl font-bold text-accent">
                {currentQuestion.points} points
              </div>
            </div>
          )}

          {teams.map((team) => (
            <div key={team.id} className="flex items-center justify-between p-2 rounded-lg border border-border">
              <span className="font-medium" style={{ color: `hsl(var(--team-${team.color}))` }}>
                {team.name}: {team.score}
              </span>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateScore(team.id, currentQuestion?.points || 100)}
                  className="bg-correct/20 hover:bg-correct/30 border-correct"
                >
                  <Plus className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateScore(team.id, -(currentQuestion?.points || 100))}
                  className="bg-incorrect/20 hover:bg-incorrect/30 border-incorrect"
                >
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};