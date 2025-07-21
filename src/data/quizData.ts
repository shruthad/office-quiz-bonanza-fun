import { Round } from "@/types/quiz";
import puzzleUnderstand from "@/assets/puzzle-understand.jpg";
import puzzleStepsisters from "@/assets/puzzle-stepsisters.jpg";
import logoStarbucks from "@/assets/logo-starbucks.jpg";
import logoMcdonalds from "@/assets/logo-mcdonalds.jpg";
import memeDistracted from "@/assets/meme-distracted.jpg";

export const QUIZ_ROUNDS: Round[] = [
  {
    id: "round1",
    name: "Visual Word Play",
    description: "Say What You See! Guess the phrase or word from these clever visual puzzles.",
    currentQuestion: 0,
    questions: [
      {
        id: "vwp1",
        content: "What phrase does this image represent?",
        image: puzzleUnderstand,
        answer: "Understand",
        points: 100
      },
      {
        id: "vwp2", 
        content: "What phrase does this image represent?",
        image: puzzleStepsisters,
        answer: "Step Sisters",
        points: 100
      },
      {
        id: "vwp3",
        content: "A large letter 'T' with a small 'U' inside it",
        answer: "Turn Inside Out",
        points: 150
      },
      {
        id: "vwp4",
        content: "The word 'MIND' written over the word 'MATTER'",
        answer: "Mind Over Matter",
        points: 150
      },
      {
        id: "vwp5",
        content: "The word 'READING' with letters arranged between two lines",
        answer: "Reading Between the Lines",
        points: 200
      },
      {
        id: "vwp6",
        content: "The number '0' followed by 'DEGREES'",
        answer: "Zero Degrees",
        points: 200
      }
    ]
  },
  {
    id: "round2",
    name: "Guess The Logo", 
    description: "Name that brand! We've removed the text - can you identify these famous logos?",
    currentQuestion: 0,
    questions: [
      {
        id: "logo1",
        content: "Which coffee company does this logo represent?",
        image: logoStarbucks,
        answer: "Starbucks",
        points: 100
      },
      {
        id: "logo2",
        content: "Which fast food restaurant uses this logo?",
        image: logoMcdonalds,
        answer: "McDonald's",
        points: 100
      },
      {
        id: "logo3",
        content: "A swoosh symbol",
        answer: "Nike",
        points: 150
      },
      {
        id: "logo4",
        content: "A partially eaten apple",
        answer: "Apple",
        points: 150
      },
      {
        id: "logo5",
        content: "Three stripes",
        answer: "Adidas", 
        points: 200
      },
      {
        id: "logo6",
        content: "A colorful peacock",
        answer: "NBC",
        points: 200
      }
    ]
  },
  {
    id: "round3",
    name: "The Meme Scene",
    description: "Guess the Movie or TV Show from these hilarious meme formats!",
    currentQuestion: 0,
    questions: [
      {
        id: "meme1",
        content: "This distracted boyfriend meme represents which movie series about wizards?",
        image: memeDistracted,
        answer: "Harry Potter",
        points: 150
      },
      {
        id: "meme2",
        content: "Expanding brain meme: Small brain = New Hope, Galaxy brain = Empire Strikes Back, Universe brain = ?",
        answer: "Return of the Jedi",
        points: 150
      },
      {
        id: "meme3",
        content: "Drake pointing away/Drake pointing toward meme about superheroes: No = DC, Yes = ?",
        answer: "Marvel",
        points: 200
      },
      {
        id: "meme4", 
        content: "Woman yelling at cat meme: Woman = Reality, Cat = Which space opera?",
        answer: "Star Wars",
        points: 200
      },
      {
        id: "meme5",
        content: "This is fine dog meme representing which show about a chemistry teacher?",
        answer: "Breaking Bad",
        points: 250
      },
      {
        id: "meme6",
        content: "Two buttons meme: Button 1 = Winter, Button 2 = Coming, Character can't choose from which show?",
        answer: "Game of Thrones",
        points: 250
      }
    ]
  }
];