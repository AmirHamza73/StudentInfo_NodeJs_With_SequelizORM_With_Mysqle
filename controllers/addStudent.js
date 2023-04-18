const { student, studentInfo } = require("../models");
const InsertStudentInfo = async (req, res, next) => {
    try {
        const { name, email, roll, fatherName, motherName, address } = req.body;

        const InsertStudent = await student.create({ name: name, email: email, roll: roll })
        if (InsertStudent && InsertStudent.id) {
            const InsertStudentDetails = await studentInfo.create({ studentId: InsertStudent.id, fatherName: fatherName, motherName: motherName, address: address })
                .then((item) => {
                    res.status(200).json({ result: 'success', msg: 'Student information submit', item: item });
                })
                .catch((error) => {
                    res.status(500).json({ result: 'error', msg: error['message'] });
                })
        }
    } catch (error) {
        res.status(500).json({ result: 'error', msg: error['message'] });
    }
}

module.exports = InsertStudentInfo;
