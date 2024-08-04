const jwt = require("jsonwebtoken");
const saltRounds = Number(process.env.SALT_ROUNDS);
const bcrypt = require("bcrypt");
const jwt_secrete_key = process.env.SEC_KEY;
const {usersModel, productsModel} = require("../models/users.model");

const home = async (req, res) => {
    // const userData = await usersModel.findByPk(req.id.user);
    res.json('userData');
}

const signup = async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, saltRounds);
        // req.body.subdomain = `${req.body.company}.${process.env.main_domain}`;
        req.body.subdomain = `${process.env.main_domain}${req.body.company}`;
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
    const userData = await usersModel.findByPk(req.id.user);
    const productNameModel = `${userData.company}_products`;
    const productModel = productsModel(productNameModel);
    if (req.method == "POST") {
        try {
            await (await productModel).create(req.body);
            res.json({ message: `Successfully added ${req.body.name} to the database` });
        } catch (err) {
            res.json({ message: err.original.sqlMessage });
        }
    } else {
        const products = await (await productModel).findAll();
        res.json({ "Agent Details": userData, "Company Products": products });
    }
}

const products = async (req, res) => {
    const productModel = productsModel(`${req.params.subdomain}_products`);
    const products = await (await productModel).findAll();
    res.json({company:req.params.subdomain, products:products});
}

const company = async (req, res) => {
    console.log(req.method);
    if (req.method == "POST") {
        res.json("endpoint accessed through post method");
    } else {
        res.json("company info");
    }
};

module.exports = {
    home,
    signup,
    signin,
    dashboard,
    company,
    products
}