const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Token = require("../models/Token");
const { parseErrorMessages } = require("../helpers/validationErrors");
const { User, signUpSchema, logInSchema } = require("../models/user");

// ADD USER TO THE DATABASE
module.exports = {
    signUpController: async function (req, res) {
        const { error } = signUpSchema.validate(req.body, { abortEarly: false });
    
        if (error) {
            const errorObject = parseErrorMessages(error.details);
            return res.status(422).json(errorObject);
        }
    
        try {
            const { username, password } = req.body;
    
            let user = await User.findOne({ username });
    
            if (user) {
            return res.status(400).json({ error: "Username is already exists!" });
            }
    
            const hashedPassword = await bcrypt.hash(password, 10);
    
            user = await new User({ ...req.body, password: hashedPassword });
        
            await user.save();
    
            res.status(201).json({ message: "User created successfully!" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
        },
    
        loginController: async function (req, res) {
        const { error } = logInSchema.validate(req.body);
    
        if (error) {
            const errorObject = parseErrorMessages(error.details);
            return res.status(422).json(errorObject);
        }
    
        try {
            const { username, password } = req.body;
    
            const user = await User.findOne({ username });
    
            if (!user) {
            return res.status(400).json({ error: "Invalid username or password!" });
            }
    
            const isValid = await bcrypt.compare(password, user.password);
    
            if (!isValid) {
            return res.status(400).json({ error: "Invalid username or password" });
            }
    
            if (!user.isVerified) {
            return res.status(403).json({ error: "Please verify your username" });
            }
    
            const token = jwt.sign({ id: user._id }, process.env.JWT_PRIVATE_KEY);
    
            res.status(200).json({ message: "Logged in successfully", token });
        } catch (error) {
            res.status(500).json({ error });
        }
        },
};