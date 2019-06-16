var axios = require("axios");
var cheerio = require("cheerio");

var db = require("../models");
module.exports = function (app) {

    app.get("/scrape", function (req, res) {
        db.article.deleteMany()
            .then(console.log('remove all'));
        axios.get("https://www.nytimes.com").then(function (response) {

            var $ = cheerio.load(response.data)

            $("article").each(function (i, element) {
                var result = {};
                result.headline = $(this).find("h2").text();
                result.summary = $(this).find("li").text();
                result.link = $(this).find("a").attr("href");


                db.article.create(result)
                    .then(function (dbarticle) {
                    })
                    .catch(function (err) {

                    });
            });

            res.redirect("/")

        });
    });

    app.get("/articles", function (req, res) {
        db.article.find({})
            .then(function (dbarticle) {
                res.json(dbarticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.get("/articles/:id", function (req, res) {
        db.article.findOne({
            _id: req.params.id
        })
            .then(function (dbarticle) {
                res.json(dbarticle)
            })
    })
};