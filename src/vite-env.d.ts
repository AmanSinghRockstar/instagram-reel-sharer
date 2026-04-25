/// <reference types="vite/client" />

declare global {
  interface ImportMetaEnv {
    readonly BASE_URL: string
    // Add other env vars here if needed.
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

export {}
