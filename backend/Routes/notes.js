const express = require("express");
const Notes = require("../Models/Notes");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");

//ROUTE TO Get NOTES /api/notes/fetchallnotes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.user });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal server error!");
  }
});

//ROUTE TO Add NOTES /api/notes/addnotes
router.post(
  "/addnotes",
  fetchuser,
  [
    //VALIDATION
    body("title", "Enter a valid name").isLength({ min: 3 }),
    body("description", "Enter a valid email").isLength({ min: 15 }),
  ],

  async (req, res) => {
    //CHECK IF VALIDATION ERRORS
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const notes = await Notes.create({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        user: req.user.user,
      });
      res.send(notes);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Internal server error!");
    }
  }
);

//ROUTE TO update NOTES /api/notes/updatenotes
router.put("/updatenotes/:id", fetchuser, async (req, res) => {
  const newNote = {};

  if (req.body.title) {
    newNote.title = req.body.title;
  }
  if (req.body.description) {
    newNote.description = req.body.description;
  }
  if (req.body.tag) {
    newNote.tag = req.body.tag;
  }

  try {
    let note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Check if the user owns the note (optional, add your logic here)
    if (note.user.toString() !== req.user.user) {
      return res.status(401).json({ error: "Not authorized" });
    }

    // Update the note with the new values
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json(note);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal Server Error");
  }
});

//ROUTE TO DELETE NOTES /api/notes/deletenotes
router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Check if the user owns the note
    if (note.user.toString() !== req.user.user) {
      return res.status(401).json({ error: "Not authorized" });
    }

    // Delete the note 
    note = await Notes.findByIdAndDelete(req.params.id);

    res.json({ success: "Note has been deleted" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
