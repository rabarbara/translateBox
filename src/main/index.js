'use strict'

import { app, BrowserWindow, globalShortcut, screen } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  const {width, height} = screen.getPrimaryDisplay().workAreaSize
  mainWindow = new BrowserWindow({
    height: 260,
    useContentSize: true,
    width: 635,
    webSecurity: true,
    frame: false,
    resizable: true,
    // put the window a bit higher than the middle
    x: Math.round(width / 2) - 317,
    y: Math.round(height / 2) - Math.round(height / 3)
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  // setting the shortcut
  const settings = require('electron-settings')
  let toggleWindow = () => {
    if (mainWindow.isFocused()) {
      mainWindow.blur()
      mainWindow.hide()
      mainWindow.minimize()
    } else {
      mainWindow.focus()
      mainWindow.show()
    }
  }
  const altSp = globalShortcut.register('Alt+Space', toggleWindow)
  if (!altSp) {
    const ret = globalShortcut.register('Ctrl+Shift+Space', toggleWindow)
    console.log(ret, 'nekaj')
    settings.set('shortcut', 'Ctrl+Shift+Space')
  } else {
    settings.set('shortcut', 'Alt+Space')
  }
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('will-quit', () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
