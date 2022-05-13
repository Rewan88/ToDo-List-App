
const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");


const todoSchema = new Schema({
    title : {
        type : String,
        required : true,
        unique : true,
    },
    isCompleted : {
        type : Boolean,
        default : true,
    }
})

// Create model and stored it in a todo variable
const todo = mongoose.model('todo', todoSchema);


module.exports = {todo};