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

// const products = (name) => {
//     const productModel = sequelize.define(name, {
//         _id: {
//             type: Sequelize.UUID,
//             primaryKey: true,
//             defaultValue: Sequelize.UUIDV4,
//         },
//         name: {
//             type: Sequelize.STRING,
//             allowNull: false,
//         },
//         description: {
//             type: Sequelize.STRING,
//             allowNull: false,
//         },
//         price: {
//             type: Sequelize.STRING,
//             allowNull: false,
//         },
//     });
// }

sequelize.sync()
    .then((results) => {
        console.log("tables created successfully");
    }).catch((error) => {
        console.log(error);
    });

module.exports = usersModel;