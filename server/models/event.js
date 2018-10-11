const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    name : {
        type : String,
        required : [true, 'Name must be filled']
    },
    location : {
        type : String
    },
    address : {
        type : String
    },
    user : {type: Schema.Types.ObjectId, ref: 'User'}
    
})

var Event = mongoose.model('Event', eventSchema)

module.exports = Event