const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const config = require('../../../config');
const conn = mysql.createConnection(config);
const query = require('../common/query');

exports.me = (req, res) => {
    conn.query(
        'SELECT * FROM Users WHERE id=?',
        [req.decoded._id],
        (err, result) => {
            if (err) return res.status(400).json(err);
            return res.status(200).json({
                result
            })
        }
    )
};


exports.buyedlist = async (req, res) => {
    try {
        await query.getBuysByBuyerId(req.decoded._id);
        for (buy of buys) {
            buy.item = await query.getItemById(buy.item_id);
            buy.item.image = await query.getImageByItemId(buy.item_id);
        }
        return res.status(200).json({
            buys
        })
    } catch (err) {
        return res.status(400).json(err);
    }
}

exports.soldlist = async (req, res) => {
    try {
        await query.getBuysBySellerId(req.decoded._id);
        for (buy of buys) {
            buy.item = await query.getItemById(buy.item_id);
            buy.item.image = await query.getImageByItemId(buy.item_id);
        }
        return res.status(200).json({
            buys
        })
    } catch (err) {
        return res.status(400).json(err);
    }
}

exports.profileImageUpload = async (req, res) => {
    const {base64} = req.body;
    try {
        await query.uploadProfileImage(base64, req.decoded._id);
    } catch (err) {
        return res.status(400).json(err);
    }
}

exports.profileImageUpdate = async (req, res) => {
    const {base64} = req.body;
    try {
        await query.uploadProfileImage(base64, req.decoded._id);
    } catch (err) {
        return res.status(400).json(err);
    }
}

exports.getUserById = async (req, res) => {
    const {user_id} = req.params;
    try {
        user = await query.getUserByUserId(user_id);
        return res.status(200).json({
            user
        })
    }
    catch (err) {
        return res.status(400).json(err);
    }
}

exports.createFollowingByUserId = async (req, res) => {
    const {user_id} = req.params;
    try {
        result = await query.createFollow(req.decoded._id, user_id);
        follower = await query.getUserByUserId(req.decoded._id);
        console.log(follwer);
        followed = await query.getUserByUserId(user_id);
        message = follower.username + " 님이 당신을 팔로우 하기 시작했습니다.";
        sendMessageResult = await query.sendMessage(followed.fcm_token, message);
        await query.createNotification(3, followed.id, null, null, message)
        return res.status(200).json({
            result
        })
    }
    catch(err) {
        return res.status(400).json(err);
    }
}

exports.getFollowings = async (req, res) => {
    try {
        console.log("!@#!@#!")
        follows = await query.getFollowsByFollowerId(req.decoded._id);
        followings = [];
        for(follow of follows){
            user = await query.getUserByUserId(follow.followed_id);
            followings.push(user);
        }
        return res.status(200).json({
            followings
        })
    }
    catch(err) {
        return res.status(400).json(err);
    }
}

exports.getFollowers = async (req, res) => {
    try {
        follows = await query.getFollowsByFollowedId(req.decoded._id);
        followers = [];
        for(follow of follows){

            user = await query.getUserByUserId(follow.follower_id);
            followers.push(user);
        }
        return res.status(200).json({
            followers
        })
    }
    catch(err) {
        return res.status(400).json(err);
    }
}

exports.checkFollower = async (req, res) => {
    const {user_id} = req.params;
    try{
        follows = await query.getFollowsByFollowedId(req.decoded._id);
        for(follow of follows){
            if(follow.follower_id == user_id){
                return res.status(200).json({
                    message:true
                })
            }
        }
        return res.status(200).json({
            message:false
        })
    }
    catch(err) {
        return res.status(400).json(err);
    }
}

exports.checkFollowing = async (req, res) => {
    const {user_id} = req.params;
    try{
        follows = await query.getFollowsByFollowerId(req.decoded._id);
        // console.log(follows);
        for(follow of follows){
            if(follow.followed_id == user_id){
                return res.status(200).json({
                    message:true
                })
            }
        }
        return res.status(200).json({
            message:false
        })
    }
    catch(err) {
        return res.status(400).json(err);
    }
}