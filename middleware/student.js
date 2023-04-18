const { check, validationResult } = require("express-validator");
var conn = require('../config/config');
const studentInfo = [
    check("name")
        .isLength({ min: 1 }).withMessage("Your name is required")
        .custom((value, { req }) => {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT name FROM student WHERE name = ?`, [req.body.name], (err, res) => {
                    if (err) {
                        reject(new Error('Server Error'))
                    }

                    if (res.length > 0) {
                        reject(new Error('Name already in use'))
                    }

                    resolve(true)

                });
            });
        }),
    check("number")
        .isLength({ min: 1 }).withMessage("Number is required"),
    check("email")
        .isEmail().withMessage("Please Insert a valid Email")
        .custom((value, { req }) => {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT email FROM student WHERE email = ?`, [req.body.email], (err, res) => {
                    if (err) {
                        reject(new Error('Server Error'))
                    }

                    if (res.length > 0) {
                        reject(new Error('E-mail already in use'))
                    }
                    resolve(true)
                });
            });
        }),
];

const addUserValidationHandler = function (req, res, next) {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        // response the errors
        res.status(500).json({ errors: mappedErrors });
    }
};

module.exports = {
    studentInfo, addUserValidationHandler
};