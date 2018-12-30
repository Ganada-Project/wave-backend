const query = require("../common/query");

exports.getCategory1 = async (req, res) => {

    try {
        category1 = await query.category.getCategory1();
        return res.status(200).json({
            category1
        })
    } catch (err) {
        return res.status(400).json(err);
    }
};

exports.getCategory2 = async (req, res) => {
    const {parent_id} = req.params;
    // try {
        category2 = await query.category.getCategory2ByParentId(parent_id);
        await res.status(200).json({
            category2
        })
    // } catch (err) {
        return res.status(406).json({
            err
        })
    // }
}

