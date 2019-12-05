
const { app,Menu, BrowserWindow, dialog, ipcMain, Notification,shell } = require("electron")
//Menu.setApplicationMenu(false)
// var app = require('app');  // Module to control application life.
// var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    'min-width': 900,
    'min-height': 600,
    skipTaskbar: true,
    toolbar: false,
    frame: false,
    transparent: true,
    titleBarStyle: 'hidden',
    'accept-first-mouse': true,
    'title-bar-style': 'hidden',
     webPreferences: {
       // preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
       }
     });
  //mainWindow.autoHideMenuBar = true;
  // and load the index.html of the app.
  mainWindow.loadFile('app/index.html');
  //mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Open the DevTools.
  // mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
