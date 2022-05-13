const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const morgan = require("morgan");

require("dotenv").config();

const app = express();

// dotenv.config({ path : '.env'})

const PORT = process.env.PORT || 4004;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

// app.use("/auth", require("./routes/auth"));
// app.use("/api/signUp", [user, verified], require("./routes/user"));
app.use("/api/todo", require("./routes/todo"));

app.use('/api/todo', '/routes/todo.js');



// log any error caused when connect to database
db().catch((err) => console.log(err));

// connect to database
async function db() {
    await mongoose.connect(process.env.DB_URI);
    console.log("**connected to db**");
}

// parse request to body-parser
app.use(bodyParser.urlencoded({ extended : true}));


app.get("/", (req, res) => {
    res.send("Welcome to our ToDo List Application API");
});

app.listen(PORT, () => {
    console.log(`Server Is Running on http://localhost:${PORT}`);
});
