const express = require('express');
const router = express.Router();

const noteController = require('../controller/note');
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);

router.route('/')
    .get(noteController.getAllNotes)
    .post(noteController.createNote)
    .put(noteController.updateNote)
    .delete(noteController.deleteNote);

module.exports = router;