import { useState, useEffect } from "react";

interface Props {
  onComplete: (name: string, apiKey: string) => void;
}

export function NativeSetup({ onComplete }: Props) {
  const [name, setName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [showKey, setShowKey] = useState(false);

  // Load saved config on mount
  useEffect(() => {
    async function load() {
      try {
        const config = await window.electronAPI?.readConfig();
        if (config) {
          if (typeof config.participantName === "string")
            setName(config.participantName);
          if (typeof config.claudeApiKey === "string")
            setApiKey(config.claudeApiKey);
        }
      } catch {
        // ignore
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleSubmit = async () => {
    // Save to persistent config
    try {
      await window.electronAPI?.writeConfig({
        participantName: name,
        claudeApiKey: apiKey,
      });
    } catch {
      // ignore
    }
    onComplete(name, apiKey);
  };

  const canProceed = name.trim().length >= 2 && apiKey.trim().startsWith("sk-");

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-gray-400">Lade Konfiguration...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-2xl font-bold text-white">
            S
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Skill-Workshop</h1>
          <p className="mt-2 text-sm text-gray-500">
            Skill-Inventur &amp; Zukunftsperspektive
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-lg font-semibold text-slate-800">
            Workshop-Teilnehmer Setup
          </h2>

          <div className="space-y-5">
            <div>
              <label
                htmlFor="participant-name"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Dein Name
              </label>
              <input
                id="participant-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Vor- und Nachname"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm transition focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
                autoFocus
              />
            </div>

            <div>
              <label
                htmlFor="api-key"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Claude API Key
              </label>
              <div className="relative">
                <input
                  id="api-key"
                  type={showKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-ant-..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-sm font-mono transition focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  title={showKey ? "Verbergen" : "Anzeigen"}
                >
                  {showKey ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="mt-1.5 text-xs text-gray-400">
                Der API Key wird lokal auf deinem Rechner gespeichert und fuer
                die KI-gestuetzte Analyse verwendet.
              </p>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!canProceed}
            className="mt-6 w-full rounded-lg bg-slate-800 px-6 py-3 font-semibold text-white shadow transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Workshop starten
          </button>

          {!canProceed && (name.length > 0 || apiKey.length > 0) && (
            <p className="mt-3 text-center text-xs text-amber-600">
              {name.trim().length < 2
                ? "Bitte gib deinen Namen ein (min. 2 Zeichen)."
                : "Der API Key muss mit 'sk-' beginnen."}
            </p>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Deine Daten bleiben lokal auf diesem Geraet.
        </p>
      </div>
    </div>
  );
}
