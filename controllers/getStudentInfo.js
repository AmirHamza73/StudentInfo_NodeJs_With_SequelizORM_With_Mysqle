const { student, studentInfo } = require("../models");

const getStudentInfo = async (req, res, next) => {
    try {
        const listOfStudentInfo = await student.findAll({
            order: [['id', 'DESC']],
            attributes: ['id', 'name', 'email', 'roll', 'chk'],
            include: [{
                model: studentInfo,
                attributes: ['id', 'studentId', 'fatherName', 'motherName', 'address'],
            }]
        })
            .then((item) => {
                res.json(item);
            })
            .catch((error) => {
                res.status(500).json({ result: 'error', msg: error.original['message'] });
            })
    } catch (error) {
        res.status(500).json({ result: 'error', msg: error['message'] });
    }
}

module.exports = getStudentInfo; 
