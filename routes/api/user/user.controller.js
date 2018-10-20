const query = require("../common/query");

exports.getUserById = async (req, res) => {
    const {user_id} = req.params;
    try {
        const user = await query.user.getUserById(user_id);
        delete user.password;

        const body = await query.body.getBodyByUserId(user_id);
        delete body.user_id;
        delete body.id;

        const personal = await query.personal.getPersonalByUserId(user_id);
        delete personal.user_id;
        delete personal.id;

        const userStyles = await query.userstyle.getStylesByUserId(user_id);
        const styles = [];

        for(userStyle of userStyles){
            const style = await query.style.getStyleById(userStyle.style_id);
            delete style.id;
            styles.push(style);
        }

        user.personal = personal;
        user.body = body;
        user.styles = styles;


        return res.status(200).json({
            user

        });
    } catch (err) {
        return res.status(400).json(err);
    }
};
