import { ipcMain } from "electron";
import fs from "fs";
import Groq from "groq-sdk";
import dotenv from "dotenv";
import DownloadVideo from "./youtubeDownloader";

dotenv.config(); 

interface TranscriptionResponse {
  text: string;
}

async function getTranscriptionGenerator(videoId: string, env: any): Promise<TranscriptionResponse> {
  const stream = await DownloadVideo(videoId);

  const response = new Response(stream);
  const audio = await response.arrayBuffer();
  const audioFile = new File([audio], 'audio.mp4', { type: 'audio/mp4' });
  const groq = new Groq({ apiKey: env.VITE_GROQ_API_KEY });

  try {
    const translation = await groq.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-large-v3",
      response_format: "verbose_json",
    });
    return translation;
  } catch (error) {
    throw error;
  }
}

ipcMain.handle("get-transcription", async (event, videoId) => {
  try {
    const transcription = await getTranscriptionGenerator(videoId, process.env);
    return transcription;
  } catch (error) {
    throw error;
  }
});

export default getTranscriptionGenerator;
