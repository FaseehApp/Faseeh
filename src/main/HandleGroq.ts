import { ipcMain } from 'electron'
import Groq from 'groq-sdk'
import dotenv from 'dotenv'
import DownloadVideo from './youtubeDownloader'

dotenv.config()

interface TranscriptionResponse {
  text: string
}

async function getTranscriptionGenerator(videoId: string): Promise<TranscriptionResponse> {
  const stream = await DownloadVideo(videoId)

  const response = new Response(stream)
  const audio = await response.arrayBuffer()
  const audioFile = new File([audio], 'audio.mp4', { type: 'audio/mp4' })
  const groq = new Groq({ apiKey: process.env.SUBTITLE_API })
  const translation = await groq.audio.transcriptions.create({
    file: audioFile,
    model: 'whisper-large-v3',
    response_format: 'verbose_json'
  })
  return translation
}

ipcMain.handle('get-transcription', async (_event, videoId) => {
  const transcription = await getTranscriptionGenerator(videoId)
  return transcription
})

export default getTranscriptionGenerator
