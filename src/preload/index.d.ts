import { ElectronAPI } from '@electron-toolkit/preload'
import { Feedback } from 'src/types/types'

declare global {
  interface Window {
    electron: ElectronAPI
    electronAPI: {
      getQuizzes: (transcript: string) => Promise<Quizzes>
      getPronDiagnosis: (audioFile: Blob, referenceText: string) => Promise<Feedback>
    }
    api: unknown
  }
}
