const { sequelize } = require("../models");
const getInformation = async (req, res, next) => {
    try {
        const { tableName, condition } = req.params;
        const count = await sequelize.query("select * from " + tableName + " where " + condition + " ", { type: sequelize.QueryTypes.SELECT })
            .then(projects => {
                res.status(200).json({ data: projects });
            })

    } catch (error) {
        res.status(500).json({ errors: [{ result: 'error', msg: error['message'] }] });
    }
}

module.exports = getInformation;
