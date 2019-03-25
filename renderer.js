'use strict'

const { ipcRenderer } = require('electron');
const database = require('./js/db.js');
const config = { db: 'pos.db' };
const $ = require('jquery');

$('#add').on('click', () => {
    let todo = document.querySelector('#todo').value;
    database.addTodo(config, todo).then((lastId) => {

        console.log({ lastId });

        database.getTodos(config).then(rows => {

            renderList(rows);

        }).catch(err => {
            console.error(err);
        });
    });

})

$('body').on('change', '.todo-check', (event) => {
    console.log({ event })
})


database.getTodos(config).then(rows => {
    renderList(rows);

}).catch(err => {
    console.error(err);
});


var renderList = function(rows) {
    let markup = '';

    rows.forEach(todo => {
        let checked = todo.done ? "checked" : '';
        markup += `<li><input class="todo-check" type="checkbox" data-rowid="${todo.rowid}" ${checked}/>  ${todo.text}</li>`
    });
    document.querySelector('#list').innerHTML = markup;
}