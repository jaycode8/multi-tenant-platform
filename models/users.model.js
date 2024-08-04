const Sequelize = require("sequelize");
const sequelize = require("../Config/db");

const usersModel = sequelize.define("users", {
    _id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    company: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    subdomain: {
        type: Sequelize.STRING,
        allowNull: true,
    },
});

const productsModel = async (name) => {
    const normalizedName = name.replace(/\s+/g, '_').toLowerCase();
    const products = sequelize.define(
        normalizedName,
        {
            _id: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            price: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        },
        { timestamps: true }
    );
    await products.sync();
    return products;
}

sequelize.sync()
    .then((results) => {
        console.log("tables created successfully");
    }).catch((error) => {
        console.log(error);
    });

module.exports = {usersModel, productsModel};