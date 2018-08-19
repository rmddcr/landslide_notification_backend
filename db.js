/**
 * Created by digvijay on 19/7/17.
 */
const mysql = require('mysql');



   
let dbconf = {
    host:'localhost',
    user:'root',//in my case it was root
    password: 'damitha@root',
    database:'DMS_db'
};





function addNewTask (title, descript,category,done) {
    let conn = mysql.createConnection(dbconf);
    conn.connect();
    conn.query(
        "INSERT INTO question SET ?",
        {title: title, descript: descript,category: category,uid: 1},
        function (err, result, fields) {
            if(err){
                throw err;
            }
            done(result);
            conn.end();
        }
    );
}

function fetchTasks(done) {
    let conn = mysql.createConnection(dbconf);
    conn.connect();
    conn.query(
        "SELECT * FROM question ORDER BY qid DESC",
        function (err, result, fields) {
            if (err) throw err;
            done(result);
            conn.end();
        }
    );
}

function fetchCatTask(cat,done) {
    let conn = mysql.createConnection(dbconf);
    conn.connect();
    conn.query(
        "SELECT * FROM question WHERE category=? ORDER BY qid DESC",[cat],
        function (err, result, fields) {
            if (err) throw err;
            done(result);
            conn.end();
        }
    );
}

function fetchq(qid,done) {
    let conn = mysql.createConnection(dbconf);
    conn.connect();
    conn.query(
        "SELECT * FROM question WHERE qid=?",[qid],
        function (err, result, fields) {
            if (err) throw err;
            done(result);
            conn.end();
        }
    );
}
function fetchatoq(qid,done) {
    let conn = mysql.createConnection(dbconf);
    conn.connect();
    conn.query(
        "SELECT * FROM answer WHERE qid=?",[qid],
        function (err, result, fields) {
            if (err) throw err;
            done(result);
            conn.end();
        }
    );
}


function addAns (ans, qid,done) {
    let conn = mysql.createConnection(dbconf);
    conn.connect();
    conn.query(
        "INSERT INTO answer SET ?",
        {ans: ans, qid: qid,upvote: 0,downvote: 0,uid: 1},
        function (err, result, fields) {
            if(err){
                throw err;
            }
            done(result);
            conn.end();
        }
    );
}

function addup (aid,done) {
    let conn = mysql.createConnection(dbconf);
    conn.connect();
    conn.query(
        "UPDATE answer SET upvote=upvote+1 WHERE aid=?",
        [aid],
        function (err, result, fields) {
            if(err){
                throw err;
            }
            done(result);
            conn.end();
        }
    );
}

function adddown (aid,done) {
    let conn = mysql.createConnection(dbconf);
    conn.connect();
    conn.query(
        "UPDATE answer SET downvote=downvote+1 WHERE aid=?",
        [aid],
        function (err, result, fields) {
            if(err){
                throw err;
            }
            done(result);
            conn.end();
        }
    );
}

// function setTaskState(taskId, isDone, done) {
//     let conn = mysql.createConnection(dbconf);
//     conn.connect();
//     conn.query(
//         "UPDATE todos SET ? WHERE ?",
//         [{done: isDone}, {id: taskId}],
//         function (err, result, fields) {
//             if (err) throw err;
//             done(result)
//         }
//     );
// }
var connection;

function handleDisconnect() {
    connection = mysql.createConnection(dbconf); // Recreate the connection, since
                                                    // the old one cannot be reused.

    connection.connect(function(err) {              // The server is either down
        if(err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err//handleDisconnect();                                  // server variable configures this)
        }
    });
}

handleDisconnect();
module.exports = {
    fetchTasks, addNewTask,fetchq,fetchatoq,addAns,addup,adddown,fetchCatTask//, setTaskState
};