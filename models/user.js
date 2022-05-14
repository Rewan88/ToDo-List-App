const Joi = require("joi");
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name : {
        type: String,
        required: true,
    },
    username : {
        type: String,
        required: true,
        unique : true,
    },
    password : {
        type: String,
        required: true,
    },
    password2 : {
        type: String,
        required: true,
    },
});

// Create model and stored it in User variable
const User = model("User", userSchema);

// Sign up validation schema
const signUpSchema = Joi.object({
    name: Joi.string().min(3).max(25).required(),
    username: Joi.string().required(),
    password: Joi.string().alphanum().min(8).max(16).required(),
    password2: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .messages({ "any.only": "Passwords don't match" }),
});

// Log in validation schema
const logInSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().alphanum().min(8).max(16).required(),
});

module.exports = { User, signUpSchema, logInSchema };


