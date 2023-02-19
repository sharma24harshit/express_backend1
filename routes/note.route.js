const express = require("express");
const { NoteModel } = require("../db");
const noteRouter = express.Router();

//-------------------------------------  GET   --------------------------------------------//
noteRouter.get("/", async(req, res) => {

    const note = await NoteModel.find();
    // console.log(note)
    res.send(note);
});
//-------------------------------------  POST   --------------------------------------------//
noteRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const note = new NoteModel(payload);
    await note.save();
    res.send({ msg: "created the note" });
  } catch (error) {
    res.send({ "msg": error.message });
  }
});
//-------------------------------------  UPDATE   --------------------------------------------//

noteRouter.patch("/update/:id", async(req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const note = await NoteModel.findOne({"_id":id})
   const userID_in_note = note.userID;
   const userID_making_req = req.body.userID;
  try {
    if( userID_making_req === userID_in_note){
      await NoteModel.findByIdAndUpdate({"_id":id},payload);
      res.send("Updated the Note")
    }
    else{
      res.send({"msg":"You are not auhtorized to do this"})
    }
    
  } catch (error) {
    res.send({"msg":"Something went wrong"})
  }
});
//-------------------------------------  DELETE   --------------------------------------------//

noteRouter.delete("/delete/:id", async(req, res) => {
  const id = req.params.id;
  const note = await NoteModel.findOne({"_id":id})
   const userID_in_note = note.userID;
   const userID_making_req = req.body.userID;
  try {
    if( userID_making_req === userID_in_note){
      await NoteModel.findByIdAndDelete({"_id":id});
      res.send({"msg":"Deleted the note"})
    }
    else{
      res.send({"msg":"You are not auhtorized to do this"})
    }
    
  } catch (error) {
    res.send({"msg":"Something went wrong"})
  }
});

module.exports = { noteRouter };
