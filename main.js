const { app, BrowserWindow } = require('electron');
const sqlite3 = require('sqlite3').verbose();

function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({ width: 800, height: 600 });

    let db = new sqlite3.Database(`./pos.db`, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the test database.');
    });

    db.serialize(() => {
        //create table
        db.run('CREATE TABLE IF NOT EXISTS usage(event, classes, component,element,json,recordid,userid, orgid, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)');

        //create views

        //group by months selected
        db.run('CREATE VIEW IF NOT EXISTS monthCount AS select json_extract(usage.json, "$.months")  as months, count(json) as count from usage group by json_extract(usage.json, "$.months")');

        //group by recordId
        db.run('CREATE VIEW IF NOT EXISTS recordIdCount AS select recordId,orgid, count() from usage group by recordId, orgid ORDER BY orgid');

        //group by userId
        db.run('CREATE VIEW IF NOT EXISTS uniqueUserImpressions AS select userId, orgId, count() from usage group by userId, orgid ORDER BY userId');

        //group by orgId
        db.run('CREATE VIEW IF NOT EXISTS orgCount AS select orgid, count() from usage group by orgid');

    });

    // and load the index.html of the app.
    win.loadFile('index.html')
}

app.on('ready', createWindow)