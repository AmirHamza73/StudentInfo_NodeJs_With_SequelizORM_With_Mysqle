const { student, studentInfo } = require("../models");

const studentInfoSingle = async (req, res, next) => {
    try {
        const { id } = req.params;
        const listOfStudentInfo = await student.findAll({
            order: [['id', 'DESC']],
            attributes: ['id', 'name', 'email', 'roll', 'chk'],
            where: { id: id },
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

module.exports = studentInfoSingle; 
