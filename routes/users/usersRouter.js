var express = require('express');
var router = express.Router();
const {
    getUsers,
    createUser,
    //     loginUser,
    //     profileUser,
    //     updateUser
} = require("./controller/usersController");

// const {
//     checkIsEmpty,
//     checkIsUndefined,
//     validateCreateData,
//     validateLoginData,
//     jwetMiddlware
// } = require("./lib/authMiddleware/index")

router.get('/', getUsers)

router.post('/create-user', createUser)

module.exports = router