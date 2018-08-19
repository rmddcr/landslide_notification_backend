
const express = require('express');
const app = express(); // init app
const db = require('./db');
const path = require('path');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');






var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');        //needed for the login part
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/loginapp');
var db2 = mongoose.connection;


var routes = require('./routes/index');
var users = require('./routes/users');







//app.use('/', express.static(__dirname + "/public"));
// var ngrok = require('ngrok');
//
// //ngrok.connect(function (err, url) {}); // https://757c1652.ngrok.io -> http://localhost:80
// ngrok.connect(3000, function (err, url) {if (err) throw err
// console.log(url)}); // https://757c1652.ngrok.io -> http://localhost:9090
//ngrok.connect({proto: 'tcp', addr: 22}, function (err, 0.0.0.0:3000) {}); // tcp://0.tcp.ngrok.io:48590



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// app.get('/qtest/all', (req, res) => {
//     db.fetchTasks(function (result) {
//     console.log(result);
//     res.send(result)
//     });
// });
app.get('/',(req,res)=>{
    res.redirect('/all');
})
app.get('/all', (req,res) => {
    db.fetchTasks(function (result) {
        console.log(result);
        res.render("home", {todos: result})
    });
});
app.get('/cats', (req,res) => {
    let cat=req.query.cat;
    db.fetchCatTask(cat,function (result) {
        console.log(result);
        res.render("home", {todos: result});
    });
});
app.get('/addq', (req,res) => {
    db.fetchTasks(function (result) {
        console.log(result);
        res.render("addq", {todos: result});
    });
});
app.get('/adda', (req,res) => {
    let qid=req.query.qid;
    let quest;
    let ans;
    db.fetchq(qid,function (result) {
        //console.log(result);
        quest=result;
        db.fetchatoq(qid,function(result){
            //console.log(result);
            ans=result;
            console.log(quest);
            console.log(ans);
            res.render("ans",{quest:quest,ans:ans});
        });
    });
});
// app.post('/qtest/add', (req, res) => {
//     db.addNewTask(req.body.title,req.body.descript, function (result) {
//     res.send(result);
// })
// });
app.post('/addq', (req, res) => {
    db.addNewTask(req.body.title,req.body.descript,req.body.category, function (result) {
        res.redirect('/addq');
    })
});
app.post('/adda', (req, res) => {
    let qid=req.query.qid;
    db.addAns(req.body.reply,qid, function (result) {
        res.redirect('/adda?qid='+qid);
    })
});
app.post('/aup', (req, res) => {
    let aid=req.query.aid;
    db.addup(aid, function (result) {
        //res.redirect('/adda?qid='+qid);
        console.log(result);
        console.log(result.upvote);
        res.send(result);
    })
});
app.post('/adown', (req, res) => {
    let aid=req.query.aid;
    db.adddown(aid, function (result) {
    //res.redirect('/adda?qid='+qid);
        console.log(result);
        console.log(result.upvote);
        res.send(result);
})
});

// app.post('/qtest/addq', (req, res) => {
//
//     db.addNewTask(req.body.title,req.body.descript, function (result) {
//     res.redirect('/all');
// })
//});

app.use('/', express.static(__dirname + "/public"));

app.listen(port,'0.0.0.0', () => {console.log('Started on 2352')});

// app.post('/todos/edit', (req, res) => {
//
//     console.log(req.body.taskid + " " + req.body.done);
//
// db.setTaskState(req.body.taskid, req.body.done,
//     function(result) {
//         res.send(result)
//     }
// )
// });