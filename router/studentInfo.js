const group = require('express-router-group');
const express = require("express");
const router = express.Router();

//const { studentInfo, addUserValidationHandler } = require("../middleware/student");

const getStudentInfo = require("../controllers/getStudentInfo");
const studentInfoSingle = require("../controllers/studentInfoSingle");
const addStudent = require("../controllers/addStudent");
const updateStudentInfo = require("../controllers/updateStudentInfo");
const studentInfoDelete = require("../controllers/studentInfoDelete");
//  studentInfo, addUserValidationHandler,
router.group("/api/v1", router => {
    router.get("/getStudentInfo", getStudentInfo);
    router.get("/studentInfoSingle/:id", studentInfoSingle);
    router.post("/addStudent", addStudent);
    router.put("/updateStudentInfo", updateStudentInfo);
    router.delete("/studentInfoDelete", studentInfoDelete);

});

module.exports = router;