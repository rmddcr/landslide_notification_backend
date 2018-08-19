/**
 * Created by digvijay on 19/7/17.
 */
function refreshTodos() {
    $.get('/qtest/all', function (data) {
        // let todolist = "";
        //
        // for (todo of data) {
        //     todolist += "<li>";
        //     todolist += "<input onchange='toggleTodo(this, "+ todo.id+")' type=checkbox " + (todo.done?"checked":"") + " >"
        //     todolist += "<span>" + todo.task + "</span>";
        //     todolist += "</li>"
        // }
        //
        // $('#todolist').html(todolist)
        console.log(data);
    })
}

// function toggleTodo(el, todoId) {
//     var done = $(el).prop('checked');
//
//     $(el).prop('checked', !done);
//
//     $.post('/todos/edit',
//         {taskid: todoId, done: (done ? 1 : 0)},
//         function (data) {
//             console.log(data, status);
//             if (data && data.changedRows > 0) {
//                 $(el).prop('checked', done)
//             }
//         })
// }


$(function () {

    refreshTodos();
});