const query = require("../common/query");

exports.uploadImage = async (req, res) => {
    const {base64} = req.body;
    try {
        result = await query.uploadImage(base64);
        return res.status(200).json({
            result
        })
    } catch (err) {
        return res.status(400).json(err);
    }
};


