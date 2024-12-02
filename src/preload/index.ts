import { contextBridge, ipcRenderer } from 'electron'
import { GrammarFeedback, Transcript, Feedback } from '../types/types'
import { GrammarEvalRequestEvent, QuizRequestEvent, QuizResponseEvent } from '../types/events'

// Custom APIs for renderer
const api = {
  evalGrammar: async (grammarEvalRequest: GrammarEvalRequestEvent): Promise<GrammarFeedback> => {
    return await ipcRenderer.invoke(GrammarEvalRequestEvent.event, grammarEvalRequest.userResponse)
  },

  generateQuiz: async (transcript: Transcript): Promise<QuizResponseEvent> => {
    return await ipcRenderer.invoke(QuizRequestEvent.event, transcript)
  },

  getPronDiagnosis: async (audioFile: ArrayBuffer, referenceText: string): Promise<Feedback> => {
    return await ipcRenderer.invoke('recorded-analysis', audioFile, referenceText)
  }
}

// Exposing APIs to the renderer via contextBridge
window.addEventListener('DOMContentLoaded', () => {
  console.log('Preload script loaded')
})

// Exposing APIs to the renderer window
if (process.contextIsolated) {
  contextBridge.exposeInMainWorld('electronAPI', api)  // Single exposure of `electronAPI`
} else {
  // For non-isolated contexts (legacy), directly expose `electronAPI`
  window.electronAPI = api
}
