import { ipcMain } from "electron";
import fs from "fs";
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config(); // Ensure .env is loaded in the main process

const GROQ_API_KEY = process.env.VITE_GROQ_API_KEY;

const groq = new Groq({ apiKey: GROQ_API_KEY });

ipcMain.handle("get-transcription", async (event, audioStreamPath) => {
    try {
        const translation = await groq.audio.translations.create({
            file: fs.createReadStream(audioStreamPath),
            model: "whisper-large-v3",
            response_format: "verbose_json",
            temperature: 0.0,
        });
        return translation;
    } catch (error) {
        throw error;
    }
});


export default {};
