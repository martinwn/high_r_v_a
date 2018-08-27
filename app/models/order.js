module.exports = function(sequelize, Sequelize) {
 
    var Order = sequelize.define('order', {
        oid: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        ordertotal: {
            type: Sequelize.INTEGER,
        },
        totalquantity: {
            type: Sequelize.INTEGER,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
 
    return Order;
 
}