const { studentInfo } = require("../models");

const updateStudentInfo = async (req, res, next) => {
    try {
        const { studentId, fatherName, motherName, address } = req.body

        const listOfStudentInfo = await studentInfo.count(
            { where: { studentId: studentId } }
        );
        if (listOfStudentInfo > 0) {
            const update = await studentInfo.update({ fatherName: fatherName, motherName: motherName, address }, { where: { studentId: studentId } })
                .then((item) => {
                    res.status(200).json({ success: [{ result: "Success", msg: 'Student information update', item: item }] });
                })
                .catch((error) => {
                    res.status(500).json({ errors: [{ result: 'errors', msg: error['message'] }] });
                })
        } else {
            res.status(500).json({ result: 'error1', msg: error['message'] });
        }

    } catch (error) {
        res.status(500).json({ result: 'error2', msg: error['message'] });
    }
}

module.exports = updateStudentInfo; 
