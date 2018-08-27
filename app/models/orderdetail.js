module.exports = function(sequelize, Sequelize) {
 
    var OrderDetails = sequelize.define('order-details', {
        odid: {
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
 
    return OrderDetails;
 
}