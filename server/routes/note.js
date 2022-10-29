const express = require('express');
const router = express.Router();

const noteController = require('../controller/note');

router.route('/')
    .get(noteController.getAllNotes)
    .post(noteController.createNote)
    .put(noteController.updateNote)
    .delete(noteController.deleteNote);

module.exports = router;