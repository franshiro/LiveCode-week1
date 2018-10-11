const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class UserController{
    static register(req, res){
        User.create({
            email : req.body.email,
            password : req.body.password,
            name : req.body.name,
            address : req.body.address,
            city : req.body.city,
            state : req.body.state,
            zip : req.body.zip
        })
        .then(user => {
            console.log(user)
            res.status(200).json({
                "success": true,
                "message": `Account ${user.name} registered`
              })
        })
        .catch(err => {
            res.status(500).json({
                message : err.message
            })
        })

    }
    static signin(req, res){
        User.findOne({ email : req.body.email})
        .then(login => {
            let isPassValid = bcrypt.compareSync(req.body.password, login.password)
            console.log(isPassValid)
            if(isPassValid){
                let token = jwt.sign({
                    id : login.id,
                    email : login.email,
                    name : login.name,
                    isGoogle : login.isGoogle
                }, process.env.SECRET)
                res.status(200).json({token})
            }
            else{
                res.status(401).json({
                    message : 'Email & Password is incorrect'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message : err.message
            })
        })
    }
    static googleSignin(req, res){

    }
    static showProfile(req, res){
        User.findOne({
            _id : req.headers.id
        })
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({
                message : err.message
            })
        })
    }
    static editProfile(req, res){
        User.update({_id : req.headers.id}, {
            email : req.body.email,
            password : req.body.password,
            name : req.body.name,
            address : req.body.address,
            city : req.body.city,
            state : req.body.state,
            zip : req.body.zip
        })
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({
                message : err.message
            })
        })
    }
    static showAllUser(req, res){
        User.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({
                message : err.message
            })
        })
    }
}

module.exports = UserController