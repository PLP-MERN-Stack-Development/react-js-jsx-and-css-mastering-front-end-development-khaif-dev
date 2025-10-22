const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const { NotFoundError } = require('../middleware/errorHandlers');

// asynchronous wrapper
const asyncWrapper = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// add task/post
router.post('/', asyncWrapper(async (req, res) =>{
    const { taskName, description, priority, status } = req.body;

    const newTask = new Task({ taskName, description, priority, status});
    const saveTask = await newTask.save();

    res.status(201).json(saveTask);
}));

// get all tasks
router.get('/', asyncWrapper( async(req,res) => {
    const tasks = await Task.find();
    if(!tasks.length) throw new NotFoundError('No Tasks Found')

    res.status(200).json(tasks);
    
}));

// get task by id
router.get('/:id', asyncWrapper( async(req,res) => {
    const task = await Task.findById(req.params.id);
    if(!task) throw new NotFoundError('Task Not Found')
    res.status(200).json(task);
}));

// update task
router.put('/:id', asyncWrapper( async(req, res) => {
    const { taskName, description, priority, status} = req.body;
    const updateTask = await Task.findByIdAndUpdate(
        req.params.id,
        { taskName, description, priority, status},
        {new: true, runValidators: true}
    )
    if(!updateTask) throw new NotFoundError('Task Not Found');
    res.status(200).json(updateTask);
}));

// delete task
router.delete('/:id', asyncWrapper( async(req, res) => {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);
    if(!deleteTask) throw new NotFoundError('Task Not Found');
    res.status(200).json({ message: `${deleteTask.taskName} deleted`});
}));

module.exports = router;
