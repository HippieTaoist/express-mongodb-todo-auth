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

router.get('/', function (req, res) {
    res.json({
        message: "todo is done! son!"
    })
})

router.post('/create-todo', jwtMiddleware, async function (req, res) {

    try {
        const {
            todoDate,
            todoNote,
            todoDone,
            todoUser,
        } = req.body

        let errObj = {}

        if (!isAlpha(todoNote)) {
            errObj.todoNote = "Alphabet Titles Only"
        }

        if (Object.keys(errObj).length > 0) {
            return res
                .status(500)
                .json({
                    message: "error /create-todo",
                    error: errObj
                })
        }

        let decodedData = jwt.decode(req.headers.authorization.slice(7), process.env.SECRET_KEY);

        console.log("Line XXX - decodedData -", decodedData)

        let foundUser = await User.findOne({
            email: decodedData.email
        })

        const createdTodo = new Todo({
            todoNote,
            todoUser: foundUser._id
        })

        let savedTodo = await createdTodo.save();

        foundUser.todos.push(savedTodo._id)

        await foundUser.save();

        res.json({
            message: "Successfully Todo'd",
            createdTodo
        })

    } catch (err) {

        res.status(500).json({
            message: "Error creating ToDo",
            error: err.message,
        })
    }
})


module.exports = router