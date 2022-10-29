const Note = require('../models/Note');

// @desc Get all notes
// @route GET /notes
// @access Private
const getAllNotes = async (req, res) => {
    try {

        const notes = await Note.find();

        if (!notes?.length) {
            throw new Error('No notes found');
        }

        res.json(notes);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc Create new note
// @route POST /notes
// @access Private
const createNote = async (req, res) => {

};

// @desc Update note
// @route PUT /notes
// @access Private
const updateNote = async (req, res) => {

};

// @desc Delete note
// @route Delete /notes
// @access Private
const deleteNote = async (req, res) => {

};


module.exports = {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote,
};