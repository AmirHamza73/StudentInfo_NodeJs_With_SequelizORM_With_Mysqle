const { sequelize } = require("../models");
const Update = async (req, res, next) => {
    try{
        const {tableName,columnName,idColumnName,idValue,updateValue} = req.body;
        const updateInfo = await sequelize.query("UPDATE "+tableName+" SET "+columnName+" = '"+updateValue+"' WHERE "+idColumnName+" = "+idValue+"")
        .then(([results, metadata]) => {
            res.status(200).json({error : [{ result: 'success', msg: `Your update successfully` }]});
          })
    }catch(error){
        res.status(500).json({errors : [{ result: 'error', msg: error['message']}]});
    }
}

module.exports = Update;
