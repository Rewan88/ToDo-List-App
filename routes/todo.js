const router = require("express").Router();

const user = require("../middleware/user");

const {
    createTodoController, 
    updateTodoController, 
    deleteTodoController, 
    getSingleTodoController, 
    getAllTodosController} = require('../controllers/todo');


// Add new ToDo to the database
router.post("/add", createTodoController.createTodo);

// Get all Todos
router.get("/", getAllTodosController.getAllTodos);

// Get a specific Todo
router.get("/:id", getSingleTodoController.getSingleTodo);

// Update a todo 
router.put("/:id/update", updateTodoController.updateTodo);

// Delete a todo
router.delete("/:id/delete", deleteTodoController.deleteTodo);


module.exports = router;

