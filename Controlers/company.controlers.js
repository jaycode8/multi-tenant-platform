
const { productsModel } = require("../models/users.model");

const productsB = async (req, res) => {
    // const productModel = productsModel(`${req.params.subdomain}_products`);
    // const products = await (await productModel).findAll();
    // res.json({ company: req.params.subdomain, products: products });
    res.json('hey am alive');
};

module.exports = {
    productsB,
};
