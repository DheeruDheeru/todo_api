var express = require('express');
var bodyparser = require('body-parser');
var port = 3000;
var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

var ToDo = require('./todo_list');

app.use('/api',ToDo);

 app.listen(port,(req,res)=>{
     console.log('app listening at http://localhost:'+port+'/api');
 });