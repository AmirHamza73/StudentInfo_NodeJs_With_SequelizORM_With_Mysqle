const { student, studentInfo } = require("../models");

const studentInfoDelete = async (req, res, next) => {
    try {
        const { studentId } = req.body;
        const listOfStudentInfo = await student.count(
            { where: { id: studentId } }
        );
        if (listOfStudentInfo > 0) {
            const studentDelete = await student.destroy({ where: { id: studentId } });
            if (studentDelete) {
                const studentInfoDelete = await studentInfo.destroy({ where: { studentId: studentId } })
                    .then((item) => {
                        res.status(200).json({ success: [{ result: "Success", msg: 'Student information delete', item: item }] });
                    })
                    .catch((error) => {
                        res.status(500).json({ errors: [{ result: 'errors', msg: error['message'] }] });
                    })
            }
        } else {
            res.status(500).json({ result: 'error1', msg: error['message'] });
        }

    } catch (error) {
        res.status(500).json({ result: 'error2', msg: error['message'] });
    }
}

module.exports = studentInfoDelete; 
