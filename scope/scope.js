const { student } = require("../models/student")

function scopess(scopeTable, condition, information) {
    const sjdlkf = scopeTable.addScope('information', {
        where: condition
    }, { override: true });
}

function scopess1(scopeTable, condition, information) {
    const sjdlkf = scopeTable.addScope('information1', {
        where: condition
    }, { override: true });
}


module.exports = { scopess, scopess1 };