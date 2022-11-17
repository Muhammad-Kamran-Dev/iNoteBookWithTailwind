const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const router = express.Router();
const Note = require("../models/Note"); // Importing Note model to perform different operations on the model
const { body, validationResult } = require("express-validator"); // To valid input of the user

// Route:1 Fetch all Notes of login User: Get "/api/notes/fetchallnotes". Login required.
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await await Note.find({ user: req.user.id });
        res.json({ notes })
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });

    }
});

// Route:2 Add new Note for current login user : POST "/api/notes/addnote". Login required.
router.post('/addnote', fetchUser, [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "passdescriptionword must be atleast 5 character long").isLength({
        min: 5,
    }),
], async (req, res) => {
    // if errors present then will send as response
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, description, tag } = req.body;

        // Check if the note with same description is already present in the database
        const noteExist = await await Note.findOne({ description });
        if (noteExist) {
            return res.status(500).json({ "Note": "Note already exists" })
        }
        const note = await Note.create({
            user: req.user.id,
            title,
            description,
            tag
        });

        res.json({ note })
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route:3 Update exisited note of login user : PUT "/api/notes/updatenote/:id". Login required.
router.put('/updatenote/:id', fetchUser, async (req, res) => {

    const { title, description, tag } = req.body;
    const newNote = {};

    //Checking for values using { (& and) short circuiting }
    title && (newNote.title = title);
    description && (newNote.description = description);
    tag && (newNote.tags = tag);
    try {


        // Check whether the note with the id is present in the database 
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(400).json({ "Error": "Note not found" });
        }

        // Check whther the user has access to update the note 
        if (note.user.toString() !== req.user.id) {
            return res.status(400).json({
                Error: "User does not have access to update"
            })
        }
        // Now if user has access to update then update the note and send the updated note as a response
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        return res.json(note)
    } catch (error) {
        return res.status(500).json("Internal Server Error");
    }
}
)
// Route:4 Delete exisiting note of login user : DELETE "/api/notes/deletenote/:id". Login required.
router.delete('/deletenote/:id', fetchUser, async (req, res) => {

    try {
        // Check whether the note with the id is present in the database 
        let note = await Note.findById({ _id: req.params.id });
        if (!note) {
            return res.status(400).json({ "Error": "Note not found" });
        }
        // Check whther the user has access to update the note 
        if (note.user.toString() !== req.user.id) {
            return res.status(400).json({
                Error: "User does not have access to update"
            })
        }
        // Now if user has access to Delete the note then delete the note and send as response with a custom error message
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ note, Message: "Note deleted successfully" })
    } catch (error) {
        return res.status(500).json("Internal Server Error");
    }
})


module.exports = router;