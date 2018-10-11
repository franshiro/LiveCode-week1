const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class Authentication{
    static isLogin(req, res, next){
        try {
            let decoded = jwt.verify(req.headers.access_token, process.env.SECRET)
            User.findOne({ email : decoded.email})
            .then(user => {
                if(user){
                    req.login = decoded
                    next()
                }
                else{
                    
                    res.status(200).json({ message : 'you dont have authorize for this action'})
                }
            })
        }
        catch (error) {
            res.status(401).json({message : `You must login First`})
        }

    }
}

module.exports = Authentication