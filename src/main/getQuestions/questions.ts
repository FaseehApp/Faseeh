import { ChatGroq } from '@langchain/groq'
import dotenv from 'dotenv'
import { Quizzes } from '../../types/types'

dotenv.config()

const GROQ_API_KEY = process.env.GROQ_API_KEY

if (!GROQ_API_KEY) {
  throw new Error('Missing API key. Ensure GROQ_API_KEY is set in the environment.')
}

export default async function getQuizzes(transcript: string): Promise<Quizzes> {
  const llm = new ChatGroq({
    model: 'llama-3.2-90b-vision-preview',
    apiKey: GROQ_API_KEY,
    temperature: 0.2
  })

  const systemMessage = `You are a language learning instructor creating simple writing practice questions based on the transcript.

CORE INSTRUCTIONS:
1. Generate a JSON-formatted array of writing questions
2. Focus exclusively on beginner-level comprehension and basic writing skills
3. Create questions that can be answered in 2-3 short phrases
4. Ensure questions are directly tied to the transcript content

SPECIFIC REQUIREMENTS:
- Generate 5-8 questions
- Questions should:
 - Be simple and straightforward
 - Require minimal writing complexity
 - Test basic understanding of the text
 - Allow for short, concise responses
 - Use clear, easy-to-understand language

SKILL FOCUS:
- Basic comprehension
- Simple description
- Short answer writing
- Vocabulary usage
- Literal text interpretation

OUTPUT FORMAT:
{
 "questions": [
 {
 "difficulty": "beginner",
 "skill": "comprehension",
 "prompt": "Write two sentences about the main person or topic in the text."
 }
 ]
}

Transcript: ${transcript}`

  try {
    const response = await llm.invoke([
      {
        role: 'system',
        content: systemMessage.trim()
      }
    ])


    const parsedResponse: Quizzes = JSON.parse(response.content as string)
    return parsedResponse
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error generating questions:', error.message)
    }
    const fallbackResponse: Quizzes = { questions: [] }
    return fallbackResponse
  }
}
