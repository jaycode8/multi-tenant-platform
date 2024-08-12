
const { productsModel, usersModel } = require("../models/users.model");

const main = async (req, res) => {
    const productModel = productsModel(`${req.subdomain}_products`);
    const products = await (await productModel).findAll();
    res.json({ Agent: req.agent, products: products });
};

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
};

module.exports = {
    main, dashboard
};
