const mongoose = require('mongoose')

const Schema = mongoose.Schema

const menuSchema = new Schema({
    name:{
        type: 'string',
        require: true
    },
    image:{
        type: 'string',
        require: true
    },
    price:{
        type: 'string',
        require: true
    },
    size:{
        type: 'string',
        require: true
    }
})

const Menu = mongoose.model('Menu', menuSchema)
module.exports = Menu