import { ChatGroq } from '@langchain/groq'
import dotenv from 'dotenv'
import { readFileSync } from 'fs'
import { Quiz, Transcript } from '../../../types/types'
import prompt from '@resources/prompts/quizGenerationPrompt.md?asset'

dotenv.config()

const QUIZ_GEN_API = process.env.QUIZ_GEN_API

if (!QUIZ_GEN_API) {
  throw new Error('Missing API key. Ensure QUIZ_GEN_API is set in the environment.')
}

export default async function getQuiz(transcript: Transcript): Promise<Quiz> {
  const llm = new ChatGroq({
    model: 'llama-3.2-90b-vision-preview',
    apiKey: QUIZ_GEN_API,
    temperature: 0.2
  })

  const systemMessage = readFileSync(prompt, 'utf8') + `\n\nTranscript: ${transcript.toText()}`

  try {
    const response = await llm.invoke([
      {
        role: 'system',
        content: systemMessage.trim()
      }
    ])

    console.log('API response content:', response.content) // Log the response to inspect its format

    const parsedResponse: Quiz = JSON.parse(response.content as string)
    return parsedResponse
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error generating questions:', error.message)
    }
    const fallbackResponse: Quiz = { questions: [] }
    return fallbackResponse
  }
}
