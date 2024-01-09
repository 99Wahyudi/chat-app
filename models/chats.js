const mongoose = require('mongoose')
const dataSchema = mongoose.Schema({
    sender : {
        required : true,
        type : String
    },
    message : {
        required : true,
        type : String
    },
    dateSent : {
        required : true,
        type : Date
    }
})

module.exports = mongoose.model('chat',dataSchema)