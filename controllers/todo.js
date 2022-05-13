const mongoose = require('mongoose');
const todo = require('../models/todo');
const asyncHandler = require('express-async-handler');



// CREATE A TODO
module.exports = {

    // CREATE A NEW TODO
    createTodo : asyncHandler( async (req, res) => {
        const {title, isCompleted} = req.body
        const createTodo = await todo.create({title, isCompleted});
        res.status(201).json({
            success : true,
            todo : todo,
            message : ' ToDo is created successfully! ',
        });
    }),

    // GET ALL TODOS
    getAllTodos : asyncHandler( async (req, res) => {
        const allTodos = await todo.find({})
        if(allTodos){
            res.status(200).json({
                success : true,
                todo : allTodos,
                message :'All ToDos are fetched successfully!'
            })
        }else {
            res.status(401).json({
                success : false,
                todo : null,
                message :'ToDos are not found!'
            })
        }
    }),

    // GET SINGLE TODO
    getSingleTodo : asyncHandler( async (req, res) => {
        const existTodo = await todo.findOne({_id : req.params.id})
        if(existTodo){
            res.status(200).json({
                success : true,
                todo : existTodo,
                message :'ToDo is fetched successfully!'
            })
        }else {
            res.status(401).json({
                success : false,
                todo : null,
                message :'ToDo is not found!'
            })
        }
    }),

    // UPDATE A SPECIFIC TODO
    updateTodo : asyncHandler( async (req, res) => {
        const {title, isCompleted} = req.body
        const existTodo = await todo.findOne({_id : req.params.id})
        if(existTodo){
            existTodo.title = title;
            existTodo.isCompleted = Completed;
            await existTodo.save();
            const updateTodo = await existTodo.updateOne();
            res.status(200).json({
                success : true,
                todo : updateTodo,
                message :'ToDo is updated successfully!'
            })
        }else {
            res.status(401).json({
                success : false,
                todo : null,
                message :'ToDo is not found!'
            })
        }
    }),

    // DELETE A TODO
    deleteTodo : asyncHandler( async (req, res) => {
        const existTodo = await todo.findOneAndDelete({_id : req.params.id})
        if(existTodo){
            await existTodo.remove();
            res.status(200).json({
                success : true,
                message :'ToDo is deleted successfully!'
            })
        }else {
            res.status(401).json({
                success : false,
                todo : null,
                message :'ToDo is not found!'
            })
        }
    })
};

