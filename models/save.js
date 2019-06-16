var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var saveSchema = new Schema({
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
  note: [{
    type: Schema.Types.ObjectId,
    ref: "note"
  }]
});
var save = mongoose.model("save", saveSchema);
module.exports = save;