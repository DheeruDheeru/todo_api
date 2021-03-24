var express = require('express');
var router = express.Router();

var ToDoList=[
        {
          id: 1,
          title: "delectus aut autem",
          completed: false
        },
        {
          id: 2,
          title: "quis ut nam facilis et officia qui",
          completed: false
        },
        {
          id: 3,
          title: "fugiat veniam minus",
          completed: false
        },
        {
          id: 4,
          title: "et porro tempora",
          completed: true
        },
        {
          id: 5,
          title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
          completed: false
        },
        {
          id: 6,
          title: "qui ullam ratione quibusdam voluptatem quia omnis",
          completed: false
        }
];


router.get('/', (req, res) => {
    res.json(ToDoList);
});

router.get('/complete',(req,res) =>{
    var todo = ToDoList.filter(todos => todos.completed == true );
    res.json(todo);
});

router.get('/notComplete',(req,res) =>{
    var todo = ToDoList.filter(todos => todos.completed == false );
    res.json(todo);
})

router.post('/create', (req, res) => {
    if (!req.body.title) {
        res.status(404);
        res.json('plz fill the title');
    } else {
        var new_id = ToDoList[ToDoList.length - 1].id + 1;
        ToDoList.push({
        id : parseInt(new_id),
        title : req.body.title,
        completed : false        
     });
        res.json('new task added!');
    }
});

router.put('/update/:id', (req, res) => {
    if (!req.params.id){
        res.status(400);
        req.json('Bad request!');
    }else{
        // var todoindex = ToDoList.findIndex(todos => todos.id == req.body.id);
        var todoindex = ToDoList.map((todos)=>{
            return todos.id;
        }).indexOf(parseInt(req.params.id));
    }
    console.log(todoindex);
    if (todoindex == -1) {
        ToDoList.push({
            id : parseInt(req.params.id),
            title : req.body.title,
            completed : false        
         });
        res.json('new task added!');

    } else {
        ToDoList[todoindex] = {
            id : parseInt(req.params.id),
            title: req.body.title,
            completed: req.body.completed
        }
         res.json('ToDo id '+ req.params.id +' updated');
    }
});



module.exports = router;