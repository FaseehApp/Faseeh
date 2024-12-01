import { ElectronAPI } from '@electron-toolkit/preload'
import { GrammarFeedback } from 'src/types/types'

declare global {
  interface Window {
    electron: ElectronAPI
    electronAPI: {
      getQuizzes: (transcript: string) => Promise<Quizzes>
    }
    api: {
      evalGrammar: (grammarEvalRequest: GrammarEvalRequestEvent) => Promise<GrammarFeedback>
      processData: (payload: string) => Promise<string>
    }
  }
}
