const { sequelize } = require("../models");
const Delete = async (req, res, next) => {
    try{
        const {tableName,idColumnName,idValue} = req.body;

        const deleteInfo = await sequelize.query("DELETE FROM "+tableName+" WHERE "+idColumnName+" = "+idValue+"")
        .then(([results, metadata]) => {
            res.status(200).json({error : [{ result: 'success', msg: `Your information delete successfully` }]});
        })
          
    }catch(error){
        res.status(500).json({errors : [{ result: 'error', msg: error['message']}]});
    }
}

module.exports = Delete;
