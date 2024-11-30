export interface Question {
  difficulty: string
  skill: string
  prompt: string
}
export interface Quizzes {
  questions: Question[]
}
