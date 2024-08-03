const jwt = require("jsonwebtoken");
const saltRounds = Number(process.env.SALT_ROUNDS);
const bcrypt = require("bcrypt");
const jwt_secrete_key = process.env.SEC_KEY;
const usersModel = require("../models/users.model");

const home = async (req, res) => {
    res.json("hello world");
}

const signup = async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, saltRounds);
        res.json(req.body);
    } catch (error) {
        console.error(error.message);
    }
};

const signin = async (req, res) => {
    try {
        res.json(req.body);
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = {
    home,
    signup,
    signin
}