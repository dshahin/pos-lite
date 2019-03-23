const { app, BrowserWindow } = require('electron');
const database = require('./js/db.js');
const config = { db: 'pos.db' };

function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({ width: 800, height: 600 });

    database.createTables(config);

    console.log();

    // and load the index.html of the app.
    win.loadFile('index.html');


}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    //if (process.platform !== 'darwin') {
    app.quit();
    //}
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
})