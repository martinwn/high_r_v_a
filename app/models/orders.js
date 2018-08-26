module.exports = function(sequelize, Sequelize) {
 
    var Order = sequelize.define('order', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        productname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        quantity: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        price: {
            type: Sequelize.INTEGER,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
 
    return Order;
 
}