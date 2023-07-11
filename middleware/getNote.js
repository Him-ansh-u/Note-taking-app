const Note = require("../models/notes.js");

const getNote = async (req, res, next) => {
  let note;
  try {
    note = await Note.findById(req.params.id);
    if (note == null) {
      return res.status(404).json({
        message: "Cannot find note",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "ID not found",
    });
  }
  res.note = note;
  next();
};

module.exports = getNote;
