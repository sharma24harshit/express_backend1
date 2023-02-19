const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb://127.0.0.1:27017/authcrud");

const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    pass: String,
  },
  {
    versionKey: false,
  }
);

const noteSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    note: { type: String, required: true },
    category: { type: String, required: true },
    userID: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const NoteModel = mongoose.model("note", noteSchema);

const UserModel = mongoose.model("user", userSchema);

module.exports = { connection, UserModel, NoteModel };
