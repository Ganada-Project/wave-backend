const query = require("../common/query");
const mysql = require('mysql');
const config = require('../../../config');

exports.getAllFeatures = async (req, res) => {

    const conn = mysql.createConnection(config);

    try {
        elasticity = await query.feature.getElasticity();
        lining = await query.feature.getLining();
        opacity = await query.feature.getOpacity();
        quality = await query.feature.getQuality();
        texture = await query.feature.getTexture();
        thickness = await query.feature.getThickness();
        season = await query.feature.getSeason();
        conn.commit();
        conn.end();
        return res.status(200).json({
            elasticity,
            lining,
            opacity,
            quality,
            texture,
            thickness,
            season
        })
    } catch (err) {
        conn.commit();
        conn.end();
        return res.status(400).json(err);
    }
};

exports.getAllQualities = async (req, res) => {

    const conn = mysql.createConnection(config);

    try {
        qualities = await query.feature.getAllQualities(conn);
        conn.commit();
        conn.end();
        return res.status(200).json({
            qualities
        })
    } catch (err) {
        conn.commit();
        conn.end();
        return res.status(400).json({err});
    }
}