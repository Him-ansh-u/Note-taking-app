const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  noteTitle: {
    type: String,
    required: true,
  },
  noteBody: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model("Note", noteSchema);
