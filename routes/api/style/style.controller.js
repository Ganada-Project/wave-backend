const query = require("../common/query");

exports.getStyleById = async (req, res) => {
    const {style_id} = req.params;
    try {
        style = await query.getStyleById(style_id);
        return res.status(200).json({
            style
        })
    } catch (err) {
        return res.status(400).json(err);
    }
};


