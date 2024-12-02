import { configDotenv } from 'dotenv'
import { Feedback } from '../../types/types'

configDotenv()

const PORT = process.env.PORT || 3000 // Default port if not provided

console.log(`Server running on port: ${PORT}`)

export default async function getPronDiagnosis(
  audioFile: ArrayBuffer,
  referenceText: string
): Promise<Feedback> {
  const data = new FormData()
  const audioBlob = new Blob([audioFile], { type: 'audio/webm' })
  data.set('audio', audioBlob, 'recording.wav')
  data.append('text', referenceText)

  try {
    const response = await fetch(`http://localhost:${PORT}/process`, {
      method: 'POST',
      body: data
    })

    if (response.ok) {
      const parsedResult: Feedback = await response.json()
      console.log(parsedResult)

      return parsedResult
    } else {
      throw new Error(`Error Fetching Response: Status ${response.status}`)
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error(`Error occurred: ${e.message}`)
    }
    throw e // Re-throw error to propagate it to the caller
  }
}
