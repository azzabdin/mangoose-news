var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var articleSchema = new Schema({
  headline: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  note:{
    type:Schema.Types.ObjectId,
    ref:"note"
  }
});

var article = mongoose.model("article", articleSchema);

module.exports = article;
