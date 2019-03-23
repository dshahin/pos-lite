'use strict'

const { ipcRenderer } = require('electron');
const database = require('./js/db.js');
const config = { db: 'pos.db' };

document.querySelector('#add').addEventListener('click', () => {
    let todo = document.querySelector('#todo').value;
    database.addTodo(config, todo).then(() => {
        database.getTodos(config).then(rows => {
            renderList(rows);

        }).catch(err => {
            console.error(err);
        });
    });

})




database.getTodos(config).then(rows => {
    renderList(rows);

}).catch(err => {
    console.error(err);
});


var renderList = function(rows) {
    let markup = '';
    rows.forEach(todo => {
        markup += `<li>${todo.text}</li>`
    });
    document.querySelector('#list').innerHTML = markup;
}