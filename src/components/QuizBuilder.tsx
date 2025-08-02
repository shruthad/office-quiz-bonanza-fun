import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Minus, Upload, Save, Eye, Download } from "lucide-react";
import { Round, Question } from "@/types/quiz";
import { toast } from "sonner";

interface QuizBuilderProps {
  onSaveQuiz: (rounds: Round[]) => void;
  onPreviewQuiz: (rounds: Round[]) => void;
  onBack: () => void;
}

interface NewQuestion {
  content: string;
  answer: string;
  points: number;
  image?: string;
}

interface NewRound {
  name: string;
  description: string;
  questions: NewQuestion[];
}

export const QuizBuilder = ({ onSaveQuiz, onPreviewQuiz, onBack }: QuizBuilderProps) => {
  const [rounds, setRounds] = useState<NewRound[]>([
    {
      name: "Round 1",
      description: "Enter your round description here",
      questions: [{ content: "", answer: "", points: 100 }]
    }
  ]);

  const addRound = useCallback(() => {
    setRounds(prev => [...prev, {
      name: `Round ${prev.length + 1}`,
      description: "Enter your round description here", 
      questions: [{ content: "", answer: "", points: 100 }]
    }]);
  }, []);

  const removeRound = useCallback((roundIndex: number) => {
    if (rounds.length > 1) {
      setRounds(prev => prev.filter((_, idx) => idx !== roundIndex));
    }
  }, [rounds.length]);

  const updateRound = useCallback((roundIndex: number, field: keyof NewRound, value: string) => {
    setRounds(prev => prev.map((round, idx) => 
      idx === roundIndex ? { ...round, [field]: value } : round
    ));
  }, []);

  const addQuestion = useCallback((roundIndex: number) => {
    setRounds(prev => prev.map((round, idx) => 
      idx === roundIndex 
        ? { ...round, questions: [...round.questions, { content: "", answer: "", points: 100 }] }
        : round
    ));
  }, []);

  const removeQuestion = useCallback((roundIndex: number, questionIndex: number) => {
    setRounds(prev => prev.map((round, idx) => 
      idx === roundIndex 
        ? { ...round, questions: round.questions.filter((_, qIdx) => qIdx !== questionIndex) }
        : round
    ));
  }, []);

  const updateQuestion = useCallback((roundIndex: number, questionIndex: number, field: keyof NewQuestion, value: string | number) => {
    setRounds(prev => prev.map((round, idx) => 
      idx === roundIndex 
        ? { 
          ...round, 
          questions: round.questions.map((q, qIdx) => 
            qIdx === questionIndex ? { ...q, [field]: value } : q
          ) 
        }
        : round
    ));
  }, []);

  const handleImageUpload = useCallback((roundIndex: number, questionIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        updateQuestion(roundIndex, questionIndex, 'image', result);
        toast.success("Image uploaded successfully! 📸");
      };
      reader.readAsDataURL(file);
    }
  }, [updateQuestion]);

  const convertToQuizFormat = useCallback((): Round[] => {
    return rounds.map((round, roundIdx) => ({
      id: `custom-round-${roundIdx}`,
      name: round.name,
      description: round.description,
      currentQuestion: 0,
      questions: round.questions.map((q, qIdx) => ({
        id: `custom-q-${roundIdx}-${qIdx}`,
        content: q.content,
        answer: q.answer,
        points: q.points,
        image: q.image
      }))
    }));
  }, [rounds]);

  const handleSave = useCallback(() => {
    const quizData = convertToQuizFormat();
    onSaveQuiz(quizData);
    toast.success("Quiz saved! Ready to play! 🎉");
  }, [convertToQuizFormat, onSaveQuiz]);

  const handlePreview = useCallback(() => {
    // Validate that we have at least one round with one complete question
    const hasValidQuestions = rounds.some(round => 
      round.questions.some(q => q.content.trim() && q.answer.trim())
    );
    
    if (!hasValidQuestions) {
      toast.error("Please add at least one question with content and answer before previewing!");
      return;
    }

    const quizData = convertToQuizFormat();
    onPreviewQuiz(quizData);
    toast.info("Starting quiz preview! 👁️");
  }, [convertToQuizFormat, onPreviewQuiz, rounds]);

  const handleExport = useCallback(() => {
    const quizData = convertToQuizFormat();
    const dataStr = JSON.stringify(quizData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `quiz-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Quiz exported successfully! 📁");
  }, [convertToQuizFormat]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Quiz Builder
            </h1>
            <p className="text-muted-foreground mt-1">Create your own custom quiz show</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button variant="outline" onClick={handleExport} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button variant="outline" onClick={handlePreview} className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </Button>
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save & Play
            </Button>
          </div>
        </div>

        {/* Rounds */}
        <div className="space-y-6">
          {rounds.map((round, roundIndex) => (
            <Card key={roundIndex} className="bg-gradient-to-r from-card to-card/80">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div className="flex-1 space-y-2">
                  <Input
                    value={round.name}
                    onChange={(e) => updateRound(roundIndex, 'name', e.target.value)}
                    className="text-xl font-bold bg-transparent border-none p-0 focus-visible:ring-0"
                    placeholder="Round Name"
                  />
                  <Textarea
                    value={round.description}
                    onChange={(e) => updateRound(roundIndex, 'description', e.target.value)}
                    className="bg-transparent border-none p-0 focus-visible:ring-0 text-muted-foreground"
                    placeholder="Round description..."
                    rows={2}
                  />
                </div>
                {rounds.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeRound(roundIndex)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Questions */}
                {round.questions.map((question, questionIndex) => (
                  <Card key={questionIndex} className="bg-secondary/50">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Question {questionIndex + 1}</Label>
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">Points:</Label>
                          <Select
                            value={question.points.toString()}
                            onValueChange={(value) => updateQuestion(roundIndex, questionIndex, 'points', parseInt(value))}
                          >
                            <SelectTrigger className="w-20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="50">50</SelectItem>
                              <SelectItem value="100">100</SelectItem>
                              <SelectItem value="150">150</SelectItem>
                              <SelectItem value="200">200</SelectItem>
                              <SelectItem value="250">250</SelectItem>
                            </SelectContent>
                          </Select>
                          {round.questions.length > 1 && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeQuestion(roundIndex, questionIndex)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      <Textarea
                        value={question.content}
                        onChange={(e) => updateQuestion(roundIndex, questionIndex, 'content', e.target.value)}
                        placeholder="Enter your question here..."
                        className="min-h-[80px]"
                      />
                      
                      <Input
                        value={question.answer}
                        onChange={(e) => updateQuestion(roundIndex, questionIndex, 'answer', e.target.value)}
                        placeholder="Enter the correct answer..."
                      />

                      {/* Image Upload */}
                      <div className="space-y-2">
                        <Label className="text-sm">Optional Image</Label>
                        <div className="flex items-center gap-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(roundIndex, questionIndex, e)}
                            className="hidden"
                            id={`image-${roundIndex}-${questionIndex}`}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById(`image-${roundIndex}-${questionIndex}`)?.click()}
                            className="flex items-center gap-2"
                          >
                            <Upload className="w-4 h-4" />
                            Upload Image
                          </Button>
                          {question.image && (
                            <span className="text-sm text-correct">✓ Image uploaded</span>
                          )}
                        </div>
                        {question.image && (
                          <img src={question.image} alt="Question" className="max-w-32 max-h-32 rounded-md object-cover" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Add Question Button */}
                <Button
                  variant="outline"
                  onClick={() => addQuestion(roundIndex)}
                  className="w-full flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Question
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Round Button */}
        <div className="mt-6 flex justify-center">
          <Button
            onClick={addRound}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Round
          </Button>
        </div>
      </div>
    </div>
  );
};