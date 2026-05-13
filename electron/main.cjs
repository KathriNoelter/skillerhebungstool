const { app, BrowserWindow, ipcMain, net } = require("electron");
const path = require("path");
const fs = require("fs");

const isDev = !app.isPackaged;

let mainWindow;

/** Persistent config path: ~/Library/Application Support/SkillWorkshop/config.json */
function getConfigPath() {
  const userDataPath = app.getPath("userData");
  return path.join(userDataPath, "config.json");
}

function readConfig() {
  try {
    const raw = fs.readFileSync(getConfigPath(), "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function writeConfig(data) {
  const configPath = getConfigPath();
  const dir = path.dirname(configPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(configPath, JSON.stringify(data, null, 2), "utf-8");
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    title: "Skill-Workshop",
    titleBarStyle: "hiddenInset",
    trafficLightPosition: { x: 16, y: 16 },
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:3055");
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}

// IPC handlers for config persistence
ipcMain.handle("config:read", () => readConfig());
ipcMain.handle("config:write", (_event, data) => {
  writeConfig(data);
  return true;
});

// IPC handler for Claude API calls (no CORS in Node.js)
ipcMain.handle(
  "claude:call",
  async (_event, apiKey, systemPrompt, userMessage, options) => {
  try {
    const opts = options || {};
    const payload = {
      model: opts.model || "claude-sonnet-4-5",
      max_tokens: opts.maxTokens || 2048,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    };
    if (typeof opts.temperature === "number") {
      payload.temperature = opts.temperature;
    }
    const body = JSON.stringify(payload);

    return await new Promise((resolve) => {
      const request = net.request({
        method: "POST",
        url: "https://api.anthropic.com/v1/messages",
      });
      request.setHeader("Content-Type", "application/json");
      request.setHeader("x-api-key", apiKey);
      request.setHeader("anthropic-version", "2023-06-01");

      let responseData = "";

      request.on("response", (response) => {
        response.on("data", (chunk) => {
          responseData += chunk.toString();
        });
        response.on("end", () => {
          try {
            const data = JSON.parse(responseData);
            if (data.error) {
              resolve({ content: "", error: `API Fehler: ${data.error.message}` });
            } else {
              const text = data.content
                ?.filter((b) => b.type === "text")
                .map((b) => b.text)
                .join("") ?? "";
              resolve({ content: text });
            }
          } catch (e) {
            resolve({ content: "", error: `Parse Fehler: ${e.message}` });
          }
        });
      });

      request.on("error", (err) => {
        resolve({ content: "", error: `Netzwerk-Fehler: ${err.message}` });
      });

      request.write(body);
      request.end();
    });
  } catch (e) {
    return { content: "", error: `Fehler: ${e.message}` };
  }
  },
);

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
