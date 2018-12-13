import {app, BrowserWindow} from "electron";
import {enableLiveReload} from "electron-compile";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import * as path from "path";

const isDevMode = process.execPath.match(/[\\/]electron/);
if (isDevMode) {
    enableLiveReload();
}

let mainWindow: Electron.BrowserWindow | null;

async function createWindow() {
    mainWindow = new BrowserWindow({
        height: 768,
        width: 1024,
    });
    mainWindow.loadFile(path.join(__dirname, "./index.html"));

    if (isDevMode) {
        await installExtension(VUEJS_DEVTOOLS);
    }

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (window === null) {
        createWindow();
    }
});
