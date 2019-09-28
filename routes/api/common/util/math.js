const mysql = require('mysql');
const config = require('../../../../config');
const conn = mysql.createConnection(config);

// Height: head.y -  leftFoot.y
// Shoulder: leftShoulder - RightShoulder
// Chest: leftChest - RightChest
// Waist: leftWaist - RightWaist
// Arm: Euclidean(rightShoulder, rightElbow) + Euclidean(rightElbow, rightHand)
// Hip: leftPelvis - rightPelvis
// Crotch: pelvis.y - thigh.y
// Thigh: (leftThigh - rightThigh)/2
// Leg: Euclidean(leftThigh, leftAncle)

// body_points: [
//     { …head },
//     { …foot },
//     { …leftNeck },
//     { …leftShulder },
//     { …leftElbow },
//     { …leftHand },
//     { …rightNeck },
//     { …rightShulder },
//     { …rightElbow },
//     { …rightHand },
//     { …leftChest },
//     { …leftWaist },
//     { …leftPelvis },
//     { …rightChest },
//     { …rightWaist },
//     { …rightPelvis },
//     { …leftThigh },
//     { …leftAnkle },
//     { …rightThigh },
//     { …rightAnkle },
//   ],

function Euclidean(Point1, Point2) {
    return Math.sqrt((Point1.x-Point2.x)**2 + (Point1.y-Point2.y)**2)
}
// shoulder,chest,arm,waist,height,hip,crotch,thigh,leg
exports.measureSize = (height, body_points) => {
    height_ratio = height / (body_points.foot.y-body_points.head.y)
    shoulder = (Math.abs((body_points.leftShoulder.x - body_points.rightShoulder.x)))*height_ratio
    chest = (Math.abs((body_points.leftChest.x - body_points.rightChest.x)))*height_ratio
    arm = (Math.abs((body_points.leftShoulder.y - body_points.leftHand.y)))*height_ratio
    waist = (Math.abs(body_points.leftWaist.x - body_points.rightWaist.x))*height_ratio
    hip = (Math.abs(body_points.leftPelvis.x - body_points.rightPelvis.x))*height_ratio
    crotch = (Math.abs(body_points.leftPelvis.y - body_points.crotch.y))*height_ratio
    thigh = (Math.abs((body_points.leftThigh.x - body_points.crotch.x)))*height_ratio
    leg = (Math.abs((body_points.leftPelvis.y - body_points.leftAnkle.y)))*height_ratio

    measure = {
        shoulder,
        chest,
        arm,
        waist,
        hip,
        crotch,
        thigh,
        leg
    }
    return measure
}