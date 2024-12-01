export interface Question {
  difficulty: string
  skill: string
  prompt: string
}

export interface Quizzes {
  questions: Question[]
}

export interface Feedback {
  explanation: string
  mistaken_words: string[]
  pronunciation_guide: string[]
  suggestions: string
  highightedSentence: string
}
