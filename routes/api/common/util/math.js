const mysql = require('mysql');
const config = require('../../../../config');
const conn = mysql.createConnection(config);

// Height: headOffset.y -  leftFootOffset.y
// Shoulder: leftShoulderOffset - RightShoulderOffset
// Chest: leftChestOffset - RightChestOffset
// Waist: leftWaistOffset - RightWaistOffset
// Arm: Euclidean(rightShoulderOffset, rightElbowOffset) + Euclidean(rightElbowOffset, rightHandOffset)
// Hip: leftPelvisOffset - rightPelvisOffset
// Crotch: pelvisOffset.y - thighOffset.y
// Thigh: (leftThighOffset - rightThighOffset)/2
// Leg: Euclidean(leftThighOffset, leftAncleOffset)

// body_points: [
//     { …headOffset },
//     { …footOffset },
//     { …leftNeckOffset },
//     { …leftShulderOffset },
//     { …leftElbowOffset },
//     { …leftHandOffset },
//     { …rightNeckOffset },
//     { …rightShulderOffset },
//     { …rightElbowOffset },
//     { …rightHandOffset },
//     { …leftChestOffset },
//     { …leftWaistOffset },
//     { …leftPelvisOffset },
//     { …rightChestOffset },
//     { …rightWaistOffset },
//     { …rightPelvisOffset },
//     { …leftThighOffset },
//     { …leftAnkleOffset },
//     { …rightThighOffset },
//     { …rightAnkleOffset },
//   ],

function Euclidean(Point1, Point2) {
    return Math.sqrt((Point1.y-Point2.y)**2 + (Point1.x-Point2.y)**2)    
}
// shoulder,chest,arm,waist,height,hip,crotch,thigh,leg
exports.measureSize = (height, body_points) => {
    height_ratio = height / (body_points.headOffset.y -  body_points.leftFootOffset.y)
    shoulder = (body_points.leftShoulderOffset.x - body_points.rightShoulderOffset.x)*height_ratio
    chest = (body_points.leftChestOffset.x - body_points.RightChestOffset.x)*height_ratio
    arm = Euclidean(body_points.rightShoulderOffset, body_points.rightElbowOffset) + Euclidean(body_points.rightElbowOffset, body_points.rightHandOffset)
    waist = body_points.leftWaistOffset.x - body_points.RightWaistOffset.x
    hip = body_points.leftPelvisOffset.x - body_points.rightPelvisOffset.x
    crotch = body_points.pelvisOffset.y - body_points.thighOffset.y
    thigh = (body_points.leftThighOffset.x - body_points.rightThighOffset.x)/2
    leg = Euclidean(body_points.leftThighOffset, body_points.leftAncleOffset)
    
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