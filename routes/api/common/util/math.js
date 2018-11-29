const mysql = require('mysql');
const config = require('../../../../config');
const conn = mysql.createConnection(config);



exports.calculateDistance = (x_1, y_1, x_2, y_2) => {
    return (x_1-x_2)*(x_1-x_2)+(y_1-y_2)*(y_1-y_2)
};
exports.calculateDistanceVertically = (x_1, y_1, x_2, y_2) => {
    return y_2-y_1
};
exports.calculateDistanceHorizontally = (x_1, y_1, x_2, y_2) => {
    return x_2-x_1
};

exports.calculateRoundByTwoDistance = (d1,d2) => {
    return 2*(d1+d2)/0.9
};

exports.calculateShoulderByCoordinate = (x_1,y_1,x_2,y_2) => {
    return calculateDistance(x_1,y_1,x_2,y_2);
};

exports.calculateHeightByCoordinate = (x_1,y_1,x_2,y_2) => {
    return calculateDistanceVertically(x_1,y_1,x_2,y_2);
};

exports.calculateArmByCoordinate = (x_1,y_1,x_2,y_2) => {
    return calculateDistance(x_1,y_1,x_2,y_2);
};

exports.calculateArmByCoordinate = (x_1,y_1,x_2,y_2) => {
    return calculateDistance(x_1,y_1,x_2,y_2);
};


