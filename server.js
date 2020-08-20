const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const UserData = require("./model/userdata");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/testUser", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose
    .connection
    .once("open", function () {
        console.log("mongo db connection successful");
    })
    .on("error", function (err) {
        console.log(err);
    });

app.use(cors());
app.use(bodyParser.json());

app.post("/user-data", function (req, res) {
    var userData = new UserData(req.body);
    userData
        .save()
        .then(function () {
            console.log("done");
            res.send({
                key: userData
                    ._id
                    .toString()
            });
        });
});

app.get("/user-data/:id", function (req, res) {
    var params = req.params;

    if (!Object.keys(params).length) 
        return false;
    
    UserData
        .findById(params.id)
        .then(function (data) {
            if (!data) 
                return res.send(false);
            res.send(data);
        })
        .catch((err) => console.log(err));
});

app.delete("/user-data/:id", function (req, res) {
    var params = req.params;

    if (!Object.keys(params).length) 
        return false;
    
    UserData
        .findByIdAndRemove(params.id)
        .then(function (data) {
            if (!data) 
                return res.send(false);
            res.send(data);
        })
        .catch((err) => console.log(err));
});

app.listen(4500, function () {
    console.log("server running on port 4500");
});
