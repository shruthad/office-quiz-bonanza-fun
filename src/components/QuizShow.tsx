import { useState, useCallback } from "react";
import { Team, GameState, TEAM_COLORS } from "@/types/quiz";
import { QUIZ_ROUNDS } from "@/data/quizData";
import { TeamCard } from "./TeamCard";
import { QuestionDisplay } from "./QuestionDisplay";
import { HostControls } from "./HostControls";
import { GameSetup } from "./GameSetup";
import { QuizBuilder } from "./QuizBuilder";
import { Button } from "@/components/ui/button";
import { Settings, Trophy, Edit } from "lucide-react";
import { toast } from "sonner";

const INITIAL_TEAMS: Team[] = [
  { id: "team-1", name: "Team Alpha", color: "red", score: 0 },
  { id: "team-2", name: "Team Beta", color: "blue", score: 0 },
  { id: "team-3", name: "Team Gamma", color: "green", score: 0 },
  { id: "team-4", name: "Team Delta", color: "orange", score: 0 }
];

export const QuizShow = () => {
  const [teams, setTeams] = useState<Team[]>(INITIAL_TEAMS);
  const [rounds, setRounds] = useState(QUIZ_ROUNDS);
  const [gameState, setGameState] = useState<GameState>({
    currentRound: 0,
    currentTeam: null,
    isAnswerRevealed: false,
    gamePhase: 'setup'
  });
  const [showHostControls, setShowHostControls] = useState(false);
  const [showQuizBuilder, setShowQuizBuilder] = useState(false);

  const currentRound = rounds[gameState.currentRound];
  const currentQuestion = currentRound?.questions[currentRound.currentQuestion];

  const handleStartGame = useCallback((newTeams: Team[]) => {
    setTeams(newTeams);
    setGameState(prev => ({ ...prev, gamePhase: 'playing' }));
    toast.success("Let the games begin! 🎉");
  }, []);

  const handleUpdateScore = useCallback((teamId: string, points: number) => {
    setTeams(prev => prev.map(team => 
      team.id === teamId 
        ? { ...team, score: Math.max(0, team.score + points) }
        : team
    ));
    
    const team = teams.find(t => t.id === teamId);
    if (points > 0) {
      toast.success(`${team?.name} scored ${points} points! 🎯`);
    } else {
      toast.error(`${team?.name} lost ${Math.abs(points)} points 😬`);
    }
  }, [teams]);

  const handleNextQuestion = useCallback(() => {
    if (currentRound.currentQuestion < currentRound.questions.length - 1) {
      setRounds(prev => prev.map((round, idx) => 
        idx === gameState.currentRound 
          ? { ...round, currentQuestion: round.currentQuestion + 1 }
          : round
      ));
      setGameState(prev => ({ ...prev, isAnswerRevealed: false }));
      toast.info("Next question loaded! 📝");
    }
  }, [currentRound, gameState.currentRound]);

  const handlePrevQuestion = useCallback(() => {
    if (currentRound.currentQuestion > 0) {
      setRounds(prev => prev.map((round, idx) => 
        idx === gameState.currentRound 
          ? { ...round, currentQuestion: round.currentQuestion - 1 }
          : round
      ));
      setGameState(prev => ({ ...prev, isAnswerRevealed: false }));
    }
  }, [currentRound, gameState.currentRound]);

  const handleNextRound = useCallback(() => {
    if (gameState.currentRound < rounds.length - 1) {
      setGameState(prev => ({ 
        ...prev, 
        currentRound: prev.currentRound + 1,
        isAnswerRevealed: false
      }));
      toast.success(`Welcome to ${rounds[gameState.currentRound + 1].name}! 🚀`);
    }
  }, [gameState.currentRound, rounds]);

  const handlePrevRound = useCallback(() => {
    if (gameState.currentRound > 0) {
      setGameState(prev => ({ 
        ...prev, 
        currentRound: prev.currentRound - 1,
        isAnswerRevealed: false
      }));
    }
  }, [gameState.currentRound]);

  const handleSelectTeam = useCallback((teamId: string) => {
    setGameState(prev => ({ ...prev, currentTeam: teamId }));
    const team = teams.find(t => t.id === teamId);
    toast.info(`${team?.name} is now active! 🎯`);
  }, [teams]);

  const handleRevealAnswer = useCallback(() => {
    setGameState(prev => ({ ...prev, isAnswerRevealed: !prev.isAnswerRevealed }));
  }, []);

  const handleResetGame = useCallback(() => {
    setTeams(INITIAL_TEAMS);
    setRounds(QUIZ_ROUNDS);
    setGameState({
      currentRound: 0,
      currentTeam: null,
      isAnswerRevealed: false,
      gamePhase: 'setup'
    });
    setShowHostControls(false);
    toast.info("Game reset! Ready for a new round 🔄");
  }, []);

  const handleSaveCustomQuiz = useCallback((customRounds: typeof QUIZ_ROUNDS) => {
    setRounds(customRounds);
    setShowQuizBuilder(false);
    toast.success("Custom quiz loaded! 🎯");
  }, []);

  const handlePreviewQuiz = useCallback((customRounds: typeof QUIZ_ROUNDS) => {
    setRounds(customRounds);
    setGameState(prev => ({ ...prev, gamePhase: 'playing' }));
    setShowQuizBuilder(false);
    toast.info("Quiz preview mode! 👁️");
  }, []);

  if (showQuizBuilder) {
    return (
      <QuizBuilder
        onSaveQuiz={handleSaveCustomQuiz}
        onPreviewQuiz={handlePreviewQuiz}
        onBack={() => setShowQuizBuilder(false)}
      />
    );
  }

  if (gameState.gamePhase === 'setup') {
    return <GameSetup onStartGame={handleStartGame} onCreateQuiz={() => setShowQuizBuilder(true)} />;
  }

  const winner = teams.reduce((prev, current) => 
    prev.score > current.score ? prev : current
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Office Quiz Show
        </h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowQuizBuilder(true)}
            className="flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Create Quiz
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowHostControls(!showHostControls)}
            className="flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            {showHostControls ? 'Hide' : 'Show'} Controls
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Teams Display */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-semibold">Teams</h2>
          </div>
          <div className="space-y-3">
            {teams.map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                isActive={gameState.currentTeam === team.id}
                onClick={() => handleSelectTeam(team.id)}
              />
            ))}
          </div>
          
          {/* Winner Display */}
          <div className="mt-6 p-4 rounded-lg border border-accent/30 bg-gradient-to-r from-accent/10 to-gold/10">
            <h3 className="text-sm font-medium text-center mb-2">Current Leader</h3>
            <div className="text-center">
              <div 
                className="text-lg font-bold mb-1"
                style={{ color: `hsl(var(--team-${winner.color}))` }}
              >
                {winner.name}
              </div>
              <div className="text-2xl font-bold text-accent animate-celebration">
                {winner.score}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`${showHostControls ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          {currentQuestion && (
            <QuestionDisplay
              question={currentQuestion}
              isAnswerRevealed={gameState.isAnswerRevealed}
              onRevealAnswer={handleRevealAnswer}
              roundName={currentRound.name}
            />
          )}
        </div>

        {/* Host Controls */}
        {showHostControls && (
          <div className="lg:col-span-1">
            <HostControls
              teams={teams}
              currentRound={currentRound}
              currentRoundIndex={gameState.currentRound}
              totalRounds={rounds.length}
              currentTeam={gameState.currentTeam}
              onUpdateScore={handleUpdateScore}
              onNextQuestion={handleNextQuestion}
              onPrevQuestion={handlePrevQuestion}
              onNextRound={handleNextRound}
              onPrevRound={handlePrevRound}
              onSelectTeam={handleSelectTeam}
              onResetGame={handleResetGame}
            />
          </div>
        )}
      </div>
    </div>
  );
};