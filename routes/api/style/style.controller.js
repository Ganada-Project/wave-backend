const query = require("../common/query");

exports.getStyleById = async (req, res) => {
    const {style_id} = req.params;
    try {
        const result = await query.style.getStyleById(style_id);
        return res.status(200).json({
            result
        })
    } catch (err) {
        return res.status(400).json(err);
    }
};

exports.getAllStyles = async (req, res) => {
    try {
        const result = await query.style.getAllStyles();
        return res.status(200).json({
            result
        })
    } catch (err) {
        return res.status(400).json(err);
    }
};

exports.getStyleByUserId = async (req, res) => {
    const {user_id} = req.params;
    try {
        const styleIds = await query.userstyle.getStylesByUserId(user_id);
        const styles = [];
        for(styleId of styleIds){
            const style = await query.style.getStyleById(styleId.style_id);
            styles.push(style);
        }
        const result = styles;
        return res.status(200).json({
            result
        })
    } catch (err) {
        return res.status(400).json(err);
    }
};