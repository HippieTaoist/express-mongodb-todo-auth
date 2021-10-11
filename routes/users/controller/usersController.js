const User = require('../model/User');

const bcrypt = require('bcryptjs');

const {
    isEmpty,
    isAlpha,
    isAlphanumeric,
    isEmail,
    isStrongPassword
} = require('validator');

const jwt = require('jsonwebtoken');

const errorHandler = require("../../utils/errorHandler/errorHandler")

async function getUsers(req, res) {

    try {
        let payload = await User
            .find(req.body)

        res.json({
            message: "Successfully Fetched Users",
            payload: payload
        })
    } catch (err) {
        res
            .status(500)
            .json({
                message: "Error fetching /getUsers",
                error: err.message
            })
    }
}

async function createUser(req, res) {

    const {
        firstName,
        lastName,
        username,
        email,
        password,
    } = req.body

    try {
        let salt = await bcrypt.gener(10);
        let hashedPassword = await bcrypt.hash(password, salt)

        const createdUser = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
        })

        let savedUser = await createdUser.save();

        res.json({
            message: "Success!!!",
            payload: savedUser
        })


    } catch (err) {
        res
            .status(500)
            .json({
                message: "Error /createUser",
                error: errorHandler(err)
            })

    }


}

module.exports = {
    getUsers,
    createUser,
}