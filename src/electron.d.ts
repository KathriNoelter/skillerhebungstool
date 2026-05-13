export interface ClaudeAPIResponse {
  content: string;
  error?: string;
}

export interface ClaudeAPIOptions {
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface ElectronAPI {
  isElectron: true;
  readConfig: () => Promise<Record<string, unknown>>;
  writeConfig: (data: Record<string, unknown>) => Promise<boolean>;
  callClaude: (
    apiKey: string,
    systemPrompt: string,
    userMessage: string,
    options?: ClaudeAPIOptions,
  ) => Promise<ClaudeAPIResponse>;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
  /** Vite-injected aus package.json (siehe vite.config.ts -> define). */
  const __APP_VERSION__: string;
}
