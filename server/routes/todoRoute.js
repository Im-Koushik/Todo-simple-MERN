const express = require('express');
const taskModel = require('../models/todoModel')

const router = express.Router();

router.get('/api/tasks', async (req, res) => {
    try {
        return res.status(200).json(await taskModel.find());
    }
    catch (err) {
        res.status(500).json(err);
    }
})

router.put('/api/task/:id', async (req, res) => {
    try {
        await taskModel.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json("Task updated successfully")
    }
    catch (err) {
        res.status(500).json(err);
    }
})

router.delete('/api/task/:id', async (req, res) => {
    try {
        await taskModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Task deleted successfully")

    }
    catch (err) {
        res.status(500).json(err);
    }
})

router.post('/api/task', async (req, res) => {
    const { task } = req.body;
    try {
        let newTask = new taskModel({ task });
        const saveTask = await newTask.save();
        return res.status(200).json(saveTask);
    }

    catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;



