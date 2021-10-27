var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var {
    jwtMiddleware
} = require('../users/lib/authMiddleware/shared/jwtMiddleware')

const Todo = require('./model/Todo');
const User = require('../users/model/User');
const errorHandler = require("../utils/errorHandler/errorHandler");

const {
    isAlpha,
    isInt
} = require('validator');

const {
    createToDo
} = require('./controller/todoController')

router.get('/', function (req, res) {
    res.json({
        message: "todo is done! son!"
    })
})

router.post('/create-todo', jwtMiddleware, createToDo)

router.put('/update-todo-by-id/:id', jwtMiddleware, async function (req, res, next) {

    const {
        todoNote,
        todoDone,
    } = req.body

    let decodedData = res.locals.decodedData

    console.log("Line XXX - decodedData -", decodedData)

    try {

        let foundUser = await User.findOne({
            email: decodedData.email
        })

        console.log("Line XXX - foundUser -", foundUser)

        let foundTodo = await Todo.findById(req.params.id)

        console.log("Line XXX - foundTodo -", foundTodo)


        res.json({
            messsage: "Successfully Updated Message",
            payload: updatedTodo
        })
    } catch (err) {

    }



})

module.exports = router