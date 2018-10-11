const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validate = require('mongoose-validator')

const isValidPass = [
    validate({
        validator: 'isLength',
        arguments:[6,25],
        message : 'Password must be more than 6, and less then 25 character'
    })
]

const userSchema = new Schema({
    email : {
        type : String,
        required : [true, 'Email must be filled'],
        unique : [true, 'Email has already use']
    },
    password : {
        type : String,
        validate : isValidPass,
        required : [true , 'Password must be filled']
    },
    name : {
        type : String,
        required : [true, 'Name must be filled']
    },
    events : [{type: Schema.Types.ObjectId, ref: 'Event'}]
})

userSchema.pre('save', function(next) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash
    next()
})

var User = mongoose.model('User', userSchema)

module.exports = User