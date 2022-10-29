const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000;

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.json({ message: 'techNotes' });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));