const jwt = require("jsonwebtoken");
const saltRounds = Number(process.env.SALT_ROUNDS);
const bcrypt = require("bcrypt");
const jwt_secrete_key = process.env.SEC_KEY;
const {usersModel, productsModel} = require("../models/users.model");

const home = async (req, res) => {
    res.json('welcome to this multitenant application');
}

const signup = async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, saltRounds);
        req.body.subdomain = `${req.body.company}.${process.env.main_domain}`;
        await usersModel.create(req.body);
        res.json({message:"successfully added new user"});
    } catch (error) {
        console.error(error.message);
    }
};

const signin = async (req, res) => {
    try {
        const foundUser = await usersModel.findOne({ where: { username: req.body.username } });
        if (foundUser) {
            const pass_macth = await bcrypt.compare(req.body.password, foundUser.password);
            if (pass_macth) {
                const token = jwt.sign({ user: foundUser._id }, jwt_secrete_key, {expiresIn: '12h'});
                res.json({message: "successfully loged in", authKey:token});
            } else {
                res.json({ message: "password is incorect" });
            }
        } else {
            res.json({message:`A user by the name ${req.body.username} does not exist`});
        }
    } catch (error) {
        console.error(error.message);
    }
}

const dashboard = async (req, res) => {
    res.json("admin dashboard");
}

module.exports = {
    home,
    signup,
    signin,
    dashboard
}