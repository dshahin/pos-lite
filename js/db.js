'use strict';

const sqlite3 = require('sqlite3').verbose();


exports.setupDB = function(config) {

    console.log('config', config);

    let db = new sqlite3.Database(config.db, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the test database.');
    });


    return db;
}

exports.createTables = function(config) {
    let db = this.setupDB(config);
    db.serialize(() => {
        //create table
        db.run('CREATE TABLE IF NOT EXISTS todo(done, text, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)');

        //create views
        db.close();

    });
}

exports.getTodos = function(config) {
    let db = this.setupDB(config);
    let todos = [];
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM todo", function(err, rows) {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });


}

exports.addTodo = function(config, todo) {
    return new Promise((resolve, reject) => {


        let db = this.setupDB(config);
        db.serialize(() => {
            //create table
            db.run(
                `INSERT INTO 
                todo(
                    done,text
                ) 
                VALUES(?,?)`, [
                    false, todo
                ],
                function(err) {
                    if (err) {
                        return console.log(err.message);
                    }
                    // get the last insert id
                    console.log(`A row has been inserted with rowid ${this.lastID}`);
                });


        });

        db.close();
        resolve();
    });
}