export interface Plugin {
  name: string
  version: string
  description: string
  main: string

  activate(): void

  deactivate(): void
}
