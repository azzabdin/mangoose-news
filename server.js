const express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 3000;

var app = express();


app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScraper";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

require("./route/scrape.js")(app);
require("./route/htmlroutes.js")(app);
require("./route/save.js")(app);

app.listen(PORT, function () {
  console.log(`Listening on PORT: ${PORT}`);
});