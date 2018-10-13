const query = require("../common/query");

exports.getStyleById = async (req, res) => {
    const {style_id} = req.params;
    try {
        result = await query.getStyleById(style_id);
        return res.status(200).json({
            result
        })
    } catch (err) {
        return res.status(400).json(err);
    }
};

exports.getAllStyles = async (req, res) => {
    try {
        result = await query.getAllStyles();
        return res.status(200).json({
            result
        })
    } catch (err) {
        return res.status(400).json(err);
    }
}