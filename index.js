const express = require("express");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(morgan("common"));
app.use(cors());
app.use(cookieParser());

const db = require("./models");


app.get("/", (req, res) => {
    res.send("Hello");
})

const studentInfo = require("./router/studentInfo");
app.use(studentInfo);

const {
    notFoundHandler,
    errorHandler
} = require("./middleware/common/errorHandler");
// 404 not found handler
app.use(notFoundHandler);
// common error handler
app.use(errorHandler);

var ip = require("ip");
db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(ip.address());
        console.log(`Server running on ports ${port}`);
    });
});


