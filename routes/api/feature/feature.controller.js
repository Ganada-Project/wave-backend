const query = require("../common/query");

exports.getAllFeatures = async (req, res) => {

    try {
        elasticity = await query.feature.getElasticity();
        lining = await query.feature.getLining();
        opacity = await query.feature.getOpacity();
        quality = await query.feature.getQuality();
        texture = await query.feature.getTexture();
        thickness = await query.feature.getThickness();
        season = await query.feature.getSeason();

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
        return res.status(400).json(err);
    }
};



