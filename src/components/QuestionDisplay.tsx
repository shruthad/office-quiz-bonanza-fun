import { Question } from "@/types/quiz";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionDisplayProps {
  question: Question;
  isAnswerRevealed: boolean;
  onRevealAnswer: () => void;
  roundName: string;
}

export const QuestionDisplay = ({
  question,
  isAnswerRevealed,
  onRevealAnswer,
  roundName
}: QuestionDisplayProps) => {
  return (
    <div className="space-y-6">
      {/* Round Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
          {roundName}
        </h2>
        <div className="w-24 h-1 mx-auto bg-gradient-to-r from-primary to-accent rounded-full"></div>
      </div>

      {/* Question Card */}
      <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-card to-card/80">
        <CardContent className="p-8">
          {/* Question Text */}
          <div className="text-center mb-6">
            <p className="text-xl font-semibold text-foreground mb-4">
              {question.content}
            </p>
            <div className="text-accent text-lg font-bold">
              Worth {question.points} points
            </div>
          </div>

          {/* Question Image */}
          {question.image && (
            <div className="mb-6 flex justify-center">
              <div className="relative max-w-md w-full">
                <img
                  src={question.image}
                  alt="Question visual"
                  className="w-full h-auto rounded-lg border-2 border-primary/30 shadow-lg animate-reveal"
                />
              </div>
            </div>
          )}

          {/* Answer Section */}
          <div className="text-center">
            <Button
              onClick={onRevealAnswer}
              variant={isAnswerRevealed ? "secondary" : "default"}
              size="lg"
              className={cn(
                "mb-4 font-semibold transition-all duration-300",
                isAnswerRevealed && "shadow-lg ring-2 ring-primary/30"
              )}
            >
              {isAnswerRevealed ? <EyeOff className="mr-2" /> : <Eye className="mr-2" />}
              {isAnswerRevealed ? "Hide Answer" : "Reveal Answer"}
            </Button>

            {/* Answer Display */}
            {isAnswerRevealed && (
              <div className="p-6 rounded-lg border-2 border-accent/50 animate-reveal">
                <div 
                  className="text-3xl font-bold text-center"
                  style={{ background: 'var(--gradient-gold)' }}
                >
                  <span className="bg-gradient-to-r from-accent to-gold bg-clip-text text-transparent animate-celebration">
                    {question.answer}
                  </span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};