var express = require('express');
var router = express.Router();
const mongoose = require('../database/connection');
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())

const TaskSchema = new mongoose.Schema({
  description: {
    type: String, 
    required: true
  },
  created_at:{
    type: Date, 
    required: true
  },
  finished_at: {
    type: Date,
    required: true
  },
  project: {
    type: String,
    required: true
  }
});

const Task = mongoose.model("Task", TaskSchema);

/* Post users */
router.post('/', async function(req, res, next) {
  const description = req.body.title
  const created_at = new Date()
  const finished_at = null
  const project = req.session.user._id
  if (req.user){
    try {
      const task = await Task.create({description, created_at, finished_at, project})
      await task.save();
      return res.send(task);
    }catch (e) {
      console.log(e)
      res.sendStatus(500)
    }
  }
  else res.sendStatus(403)
  
});

/* Post users listing. */
router.get('/', async function(req, res, next) {
  try {
    const user = req.session.user._id
    const tasks = await Task.find({user});
    return res.send(tasks);
  } catch (e){
    console.log(e)
    res.sendStatus(404)
  }
});

router.put('/', async function(req, res, next) {
  try {
    const user = req.session.user._id
    const tasks = await Task.put({user});
    return res.send(tasks);
  } catch (e){
    console.log(e)
    res.sendStatus(404)
  }
})

module.exports = router;
