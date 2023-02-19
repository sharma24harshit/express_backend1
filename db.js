const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb+srv://mongodb:mongodb@cluster0.c6goz.mongodb.net/authcrud?retryWrites=true&w=majority");

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
