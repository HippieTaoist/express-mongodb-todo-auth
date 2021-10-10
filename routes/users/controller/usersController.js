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

}

module.exports = {
    getUsers,
    createUser,
}