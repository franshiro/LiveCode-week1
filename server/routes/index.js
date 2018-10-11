var express = require('express');
var router = express.Router();
const userRouter = require('./users')
const userController = require('../controllers/userController')
const Event = require('../models/event')
const User = require('../models/user')
const midleware = require('../midleware/auth')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Welcome to LiveCode')
});

router.post('/events',midleware.isLogin, (req, res) => {
  Event.create({
    name : req.body.name,
    location : req.body.location,
    address : req.body.address,
    user : req.login.id
  })
  .then(event => {
    console.log(event)
      User.findByIdAndUpdate(req.login.id,{
          $push :{
              events : event._id
          }
      })
      .then(user => {
          res.status(200).json(event)
      })
  })
  .catch(err => {
      res.status(500).json({message : err})
  })
})

router.get('/events', (req, res)=> {
  Event.find()
  .then(events => {
    res.status(200).json(events)
  })
  .catch(err => {
    res.status(500).json({
      message : err.message
    })
  })
})

router.get('/events/search/:keyword', midleware.isLogin, (req, res)=> {
  Event.find({name: new RegExp(req.params.keyword, 'i')})
  .then(data => {
      res.status(200).json(data)
  })
  .catch(err => {
      res.status(500).json({error: err.message})
  })
})

router.delete('/events/:id',midleware.isLogin, (req,res)=> {
  Event.findById(req.params.id)
  .then(event => {
    if(event.user == req.login.id){
      Event.findByIdAndDelete({ _id : req.params.id})
      .then(deleted => {
        res.status(200).json({
          "success": true,
          "message": `Event with id ${deleted._id} deleted`
        })
      })
    }
    else{
      res.status(200).json({message : ' you cant do this action'})
    }
  })
  .catch(err => {
    res.status(500).json({err})
  })
})


router.use('/users', userRouter)

module.exports = router;
