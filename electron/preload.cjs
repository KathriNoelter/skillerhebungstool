const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  isElectron: true,
  readConfig: () => ipcRenderer.invoke("config:read"),
  writeConfig: (data) => ipcRenderer.invoke("config:write", data),
  callClaude: (apiKey, systemPrompt, userMessage, options) =>
    ipcRenderer.invoke(
      "claude:call",
      apiKey,
      systemPrompt,
      userMessage,
      options ?? {},
    ),
});
