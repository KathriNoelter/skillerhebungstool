const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const DEFAULT_MODEL = "claude-sonnet-4-5";
const DEFAULT_MAX_TOKENS = 2048;

export interface ClaudeMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ClaudeResponse {
  content: string;
  error?: string;
}

export interface CallClaudeOptions {
  /** Override the default model (e.g. "claude-sonnet-4-6" fuer komplexere Analysen). */
  model?: string;
  /** Max output tokens. Default 2048. */
  maxTokens?: number;
  /** 0..1. Niedrige Werte = stabilere Outputs. Anthropic-default ist 1. */
  temperature?: number;
}

/**
 * Calls the Claude API.
 * - In Electron: routes through IPC to Node.js (no CORS issues).
 * - In Browser: direct fetch with anthropic-dangerous-direct-browser-access header.
 */
export async function callClaude(
  apiKey: string,
  systemPrompt: string,
  userMessage: string,
  options: CallClaudeOptions = {},
): Promise<ClaudeResponse> {
  if (!apiKey || !apiKey.startsWith("sk-")) {
    return { content: "", error: "Kein gueltiger API Key vorhanden." };
  }

  // Electron path: use IPC
  if (window.electronAPI?.callClaude) {
    try {
      const result = await window.electronAPI.callClaude(
        apiKey,
        systemPrompt,
        userMessage,
        options,
      );
      return result;
    } catch (e) {
      return {
        content: "",
        error: `Electron API Fehler: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  // Browser path: direct fetch
  try {
    const body: Record<string, unknown> = {
      model: options.model ?? DEFAULT_MODEL,
      max_tokens: options.maxTokens ?? DEFAULT_MAX_TOKENS,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    };
    if (typeof options.temperature === "number") {
      body.temperature = options.temperature;
    }
    const response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errBody = await response.text();
      return {
        content: "",
        error: `API Fehler (${response.status}): ${errBody}`,
      };
    }

    const data = await response.json();
    const text =
      data.content
        ?.filter((b: { type: string }) => b.type === "text")
        .map((b: { text: string }) => b.text)
        .join("") ?? "";
    return { content: text };
  } catch (e) {
    return {
      content: "",
      error: `Netzwerk-Fehler: ${e instanceof Error ? e.message : String(e)}`,
    };
  }
}
