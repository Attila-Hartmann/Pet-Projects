const express = require('express');
const router = express.Router();
let {toDos, date, days, months} = require('./server/fakeServer');
const {todoSchema} = require('./utilities/todoSchema');
const { v4: uuid } = require('uuid');
const ExpressError = require('./utilities/expressError');

const validateToDo = (req,res,next) => {
    const {error} = todoSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}



router.get('/', (req,res) => {
    toDos.sort((a,b) => {
        if (a.time < b.time){
            return -1;
        }
        if (a.time < b.time) {
            return 1;
        }
        return 0;
    })
    res.render('todos/home', {toDos, date, days, months})
})

router.get('/new', (req,res) => {
    res.render('todos/new')
})

router.post('/', validateToDo, (req,res) => {
    const {task, time, description} = req.body;
    toDos.push({task, time, description, id: uuid()});
    res.redirect('/todolist')
})

router.get('/:id', (req,res) => {
    const { id } = req.params;
    const toDo = toDos.find(item => item.id === id);
    res.render('todos/show', {toDo, months})
})

router.get('/:id/edit', (req,res) => {
    const { id } = req.params;
    const foundToDo = toDos.find(item => item.id === id);
    res.render('todos/edit', {foundToDo})
})

router.put('/:id', validateToDo, (req,res) => {
    const { id } = req.params;
    const foundToDo = toDos.find(item => item.id === id);

    const {task, time, description} = req.body;
    foundToDo.task = task;
    foundToDo.time = time;
    foundToDo.description = description;

    res.redirect(`/todolist/${foundToDo.id}`)

})

router.delete('/:id', (req,res) => {
    const { id } = req.params;
    toDos = toDos.filter(item => item.id !== id)
    res.redirect('/todolist')
})


module.exports = router;