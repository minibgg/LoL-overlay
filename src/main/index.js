const { app, BrowserWindow } = require('electron')
const path = require('path')

app.commandLine.appendSwitch('ignore-certificate-errors')

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 400,
    frame: false,
    opacity: 1,
    resizable: true,
    webPreferences: {
      webSecurity: false
    }
  })

  if (process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    win.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  createWindow()
})
