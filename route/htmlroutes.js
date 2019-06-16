var path = require("path");
module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("index", {
            msg: "the index"
        })
    });

    app.get("/save ", function (req, res) {
        res.render("save", {
            msg: "your saved articles"
        })
    });

};
