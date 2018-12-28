const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var devConfig = require('./backend/config/env');

//const logger = require("morgan");

const studentRoutes = require("./backend/routes/students");
//const clientsRoutes = require("./backend/routes/clients");
const usersRoutes = require("./backend/routes/users");
const passport = require('passport');

const app = express();
const PORT = devConfig.port;
const DATABASE = devConfig.database;





mongoose
    .connect(
        DATABASE, {
            useNewUrlParser: true
        })
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("Connection failed!");
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});
app.use(passport.initialize({ userProperty: 'currentUser' }));
//configureJWTStrategy();

app.use("/api/student", studentRoutes);
// app.use("/api/clients", clientsRoutes);
app.use("/api/users", usersRoutes);
app.listen(PORT, function () {
    console.log('Server started on port ' + PORT)
})


module.exports = app;