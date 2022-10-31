const Note = require('../models/Note');

// @desc Get all notes
// @route GET /notes
// @access Private
const getAllNotes = async (req, res) => {
    try {

        const notes = await Note.find().populate('user', 'username');

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
    try {
        const { user, title, text } = req.body;

        // Confirm data
        if (!user || !title || !text) {
            throw new Error('All fields are required');
        }

        // Check for duplicate title
        const duplicateTitle = await Note.find({ title });

        if (duplicateTitle?.length !== 0) {
            throw new Error('Note title already exists');
        }

        // Create note
        const note = await Note.create({
            user,
            title,
            text
        });

        if (note) {
            return res.status(201).json({ message: 'Note successfully created' });
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc Update note
// @route PUT /notes
// @access Private
const updateNote = async (req, res) => {
    try {

        const { id, user, title, text, completed } = req.body;

        // Confirm data
        if (!id || !user || !title || !text || typeof completed !== 'boolean') {
            throw new Error('All fields are required');
        }

        // check if note exists
        const note = await Note.findById(id);
        if (!note) {
            throw new Error('Note not found');
        }

        note.user = user;
        note.title = title;
        note.text = text;
        note.completed = completed;

        const updatedNote = await note.save();

        res.json({ message: `${updatedNote.title} successfully updated` });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc Delete note
// @route Delete /notes
// @access Private
const deleteNote = async (req, res) => {
    try {
        const { id } = req.body;

        // Check if note exists
        const note = await Note.findById(id).exec();

        if (!note) {
            throw new Error('Note not found');
        }

        const deletedNote = await note.deleteOne();

        res.json({ message: `${deletedNote.title} successfully removed` });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }

};


module.exports = {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote,
};