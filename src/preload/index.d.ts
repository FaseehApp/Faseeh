import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    electronAPI: {
      getQuizzes: (transcript: string) => Promise<Quizzes>
    }
    api: unknown
  }
}
