const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

//ROUTE 1 Get All the notes : GET "/api/notes/fetchallnotes" : login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    //log in the logger

    //error in the code
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 2  Add a new note : POST "/api/notes/addnote" : login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Title must be atleast 3 characters").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters.").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;

    //If there are validation error send bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //create  a new note with all the data
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      //save the note
      const savedNote = await note.save();

      //return the note
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      //log in the logger

      //error in the code
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 3  Updating existing note : PUT "/api/notes/updatenote" : login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tags } = req.body;

    //create a new note object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tags) {
      newNote.tags = tags;
    }

    //find the note that is to be updated

    let note=await Notes.findById(req.params.id)
    if(!note){return res.status(404).send("Not found")}

    //check the user owns the note
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Access Denied")
    }
    note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({"Sucess":"Updated",note})

  }  catch (error) {
    console.log(error.message);
    //log in the logger

    //error in the code
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 4  Delete the note : DELETE "/api/notes/deletenote" : login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {

      //find the note that is to be deleted
  
      let note=await Notes.findById(req.params.id)
      if(!note){return res.status(404).send("Not found")}
  
      //check the user owns the note
      if(note.user.toString()!==req.user.id){
          return res.status(401).send("Access Denied")
      }
      note=await Notes.findByIdAndDelete(req.params.id)
      res.json({"Sucess":"Deleted",note})
  
    }  catch (error) {
      console.log(error.message);
      //log in the logger
  
      //error in the code
      res.status(500).send("Internal Server Error");
    }
  });

module.exports = router;
