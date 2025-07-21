export interface Team {
  id: string;
  name: string;
  color: 'red' | 'blue' | 'green' | 'orange';
  score: number;
}

export interface Question {
  id: string;
  content: string;
  image?: string;
  answer: string;
  points: number;
}

export interface Round {
  id: string;
  name: string;
  description: string;
  questions: Question[];
  currentQuestion: number;
}

export interface GameState {
  currentRound: number;
  currentTeam: string | null;
  isAnswerRevealed: boolean;
  gamePhase: 'setup' | 'playing' | 'finished';
}

export const TEAM_COLORS = {
  red: 'team-red',
  blue: 'team-blue', 
  green: 'team-green',
  orange: 'team-orange'
} as const;

export const TEAM_GRADIENTS = {
  red: 'var(--gradient-team-red)',
  blue: 'var(--gradient-team-blue)',
  green: 'var(--gradient-team-green)', 
  orange: 'var(--gradient-team-orange)'
} as const;