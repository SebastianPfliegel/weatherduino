import {app, BrowserWindow} from "electron";
import {enableLiveReload} from "electron-compile";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import * as path from "path";

const isDevMode = process.execPath.match(/[\\/]electron/);
if (isDevMode) {
    enableLiveReload();
}

let window: Electron.BrowserWindow | null;

const createWindow = async () => {
    window = new BrowserWindow({
        darkTheme: true,
        height: 768,
        width: 1024,
    });
    window.loadFile(path.join(__dirname, "./index.html"));

    if (isDevMode) {
        await installExtension(VUEJS_DEVTOOLS);
    }

    window.on("closed", () => {
        window = null;
    });
};

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
