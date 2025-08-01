import { useState } from "react";
import { Team } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Play, Users, Trophy, Edit, Upload } from "lucide-react";
import { TeamCard } from "./TeamCard";

interface GameSetupProps {
  onStartGame: (teams: Team[]) => void;
  onCreateQuiz: () => void;
  onImportQuiz: () => void;
}

const DEFAULT_TEAM_NAMES = ["Team Alpha", "Team Beta"];
const TEAM_COLORS: Team['color'][] = ['red', 'blue'];

export const GameSetup = ({ onStartGame, onCreateQuiz, onImportQuiz }: GameSetupProps) => {
  const [teamNames, setTeamNames] = useState<string[]>(DEFAULT_TEAM_NAMES);

  const handleTeamNameChange = (index: number, name: string) => {
    const newNames = [...teamNames];
    newNames[index] = name;
    setTeamNames(newNames);
  };

  const handleStartGame = () => {
    const teams: Team[] = teamNames.map((name, index) => ({
      id: `team-${index + 1}`,
      name: name || `Team ${index + 1}`,
      color: TEAM_COLORS[index],
      score: 0
    }));
    onStartGame(teams);
  };

  const previewTeams: Team[] = teamNames.map((name, index) => ({
    id: `team-${index + 1}`,
    name: name || `Team ${index + 1}`,
    color: TEAM_COLORS[index],
    score: 0
  }));

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-slide-up">
            Office Quiz Show! 🎉
          </h1>
          <p className="text-xl text-muted-foreground">
            Get ready for an epic battle of wits with your colleagues!
          </p>
        </div>

        {/* Setup Card */}
        <Card className="bg-gradient-to-br from-card to-card/80 border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Users className="w-6 h-6" />
              Team Setup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Team Name Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamNames.map((name, index) => (
                <div key={index} className="space-y-2">
                  <Label 
                    htmlFor={`team-${index}`}
                    className="text-sm font-medium"
                    style={{ color: `hsl(var(--team-${TEAM_COLORS[index]}))` }}
                  >
                    Team {index + 1} ({TEAM_COLORS[index]})
                  </Label>
                  <Input
                    id={`team-${index}`}
                    value={name}
                    onChange={(e) => handleTeamNameChange(index, e.target.value)}
                    placeholder={`Enter team ${index + 1} name`}
                    className="border-2"
                    style={{ borderColor: `hsl(var(--team-${TEAM_COLORS[index]}))` }}
                  />
                </div>
              ))}
            </div>

            {/* Team Preview */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Team Preview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {previewTeams.map((team) => (
                  <TeamCard 
                    key={team.id} 
                    team={team} 
                    showScore={false}
                  />
                ))}
              </div>
            </div>

            {/* Game Info */}
            <div className="bg-muted/30 rounded-lg p-4 space-y-2">
              <h4 className="font-semibold text-accent">Game Overview:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>🧩 <strong>Round 1:</strong> Visual Word Play - Solve clever visual puzzles</li>
                <li>🏢 <strong>Round 2:</strong> Guess The Logo - Identify famous brands</li>
                <li>😂 <strong>Round 3:</strong> The Meme Scene - Movie/TV shows from memes</li>
                <li>🏆 Points increase in difficulty, team with highest score wins!</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <Button 
                  onClick={onCreateQuiz}
                  size="lg"
                  variant="outline"
                  className="flex-1 text-lg font-semibold"
                >
                  <Edit className="w-5 h-5 mr-2" />
                  Create Custom Quiz
                </Button>
                <Button 
                  onClick={onImportQuiz}
                  size="lg"
                  variant="secondary"
                  className="flex-1 text-lg font-semibold"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Import Quiz
                </Button>
              </div>
              <Button 
                onClick={handleStartGame}
                size="lg"
                className="w-full text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Quiz Show!
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};