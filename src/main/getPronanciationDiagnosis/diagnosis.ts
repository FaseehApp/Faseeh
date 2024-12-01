import { configDotenv } from 'dotenv'
import { Feedback } from '../../types/types'

configDotenv()

const PORT = process.env.PORT

export default async function getPronDiagnosis(
  audioFile: Blob,
  referenceText: string
): Promise<Feedback> {
  const data: FormData = new FormData()
  data.append('audio', audioFile)
  data.append('text', referenceText)

  try {
    const response = await fetch(`https://localhost:${PORT}/process`, {
      method: 'POST',
      body: data
    })
    if (response.status === 200) {
      const parsedResult: Feedback = await response.json()
      return parsedResult
    } else throw new Error(`Error Fetching Response: Status ${response.status}`)
  } catch (e) {
    if (e instanceof Error) console.error(e.message)
    return {
      explanation: '',
      mistaken_words: [],
      pronunciation_guide: [],
      suggestions: '',
      highightedSentence: ''
    }
  }
}
