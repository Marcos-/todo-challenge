var express = require('express');
var router = express.Router();
const mongoose = require('../database/connection');
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String, 
    required: true
  },
  tasks:{
    type: Array, 
    required: true
  },
  user: {
    type: String,
    required: true
  }
});

const Project = mongoose.model("Project", ProjectSchema);

/* Post users */
router.post('/', async function(req, res, next) {
  const title = req.body.title
  const tasks = []
  const user = req.body.user
  // if (req.user){
    try {
      const project = await Project.create({title, tasks, user})
      await project.save();
      return res.send(project);
    }catch (e) {
      console.log(e)
      res.sendStatus(500)
    }
  // } else res.sendStatus(403)
});

/* Post users listing. */
router.get('/', async function(req, res, next) {
  try {
    const user = req.session.user?._id ? req.session.user._id : req.query.id
    const projects = await Project.find({user});
    console.log(projects)
    return res.send(projects);
  } catch (e){
    console.log(e)
    res.sendStatus(404)
  }
});

router.put('/', async function(req, res, next) {
  const title = req.body.title
  const tasks = req.body.tasks
  const user = req.body.user
  try {
    // const user = req.session.user._id
    const projects = await Project.findOneAndUpdate({user, title}, {title, tasks, user});
    return res.send(projects);
  } catch (e){
    console.log(e)
    res.sendStatus(404)
  }
})

router.delete('/', async function(req, res, next) {
  console.log(req.body)
  const title = req.body.title
  const user = req.body.user
  try {
    const projects = await Project.findOneAndDelete({ user, title }, function (err) {
      if(err) console.log(err);
      console.log("Successful deletion");
    });
    return res.send(projects);
  } catch (e){
    console.log(e)
    res.sendStatus(404)
  }
})

module.exports = router;
