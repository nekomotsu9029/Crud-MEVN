const express = require('express');
const router = express.Router();
const path = require('path');

const _task = require('../models/task');

/**
 * 
 */

router.get('/task', async (req, res)=>{
    const _taskFind = await _task.find();
    res.json({
        tasks: _taskFind
    });
});

router.post('/task', async (req, res)=>{
    const _taskSave = new _task(req.body);
    await _taskSave.save();
    res.json('la tarea fue creada satisfactoriamente :)')
});

router.put('/task/:id', async (req, res)=>{
    const {id} = req.params;
    await _task.update({_id: id}, req.body);
    res.json('La tarea se actualizo satisfactoriamente :)')
});

router.delete('/task/:id', async (req, res)=>{
    const {id} = req.params;
    await _task.remove({_id: id});
    res.json('La tarea se elimino satisfactoriamente :)')
});

module.exports = router;