const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://aagnant:GZQihsPU2bBYvA2P@cluster0.bwuhjik.mongodb.net/Mern?retryWrites=true&w=majority",{
    useUnifiedTopology:true
})
    .then(()=> console.log ("Connected to DB"))
    .catch(console.error);

    const Todo = require('./models/Todo');

    app.get('/todos', async (req, res) => {
        const todos = await Todo.find();
    
        res.json(todos);
    });
    
    app.post('/todo/new', (req, res) => {
        const todo = new Todo({
            text: req.body.text
        })
    
        todo.save();
    
        res.json(todo);
    });
    
    app.delete('/todo/delete/:id', async (req, res) => {
        const result = await Todo.findByIdAndDelete(req.params.id);
    
        res.json({result});
    });
    
    app.get('/todo/complete/:id', async (req, res) => {
        const todo = await Todo.findById(req.params.id);
    
        todo.complete = !todo.complete;
    
        todo.save();
    
        res.json(todo);
    })
    
    app.put('/todo/update/:id', async (req, res) => {
        const todo = await Todo.findById(req.params.id);
    
        todo.text = req.body.text;
    
        todo.save();
    
        res.json(todo);
    });



app.listen(3001,()=>{
    console.log("Server is running")
})


