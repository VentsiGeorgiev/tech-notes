const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('./middleware/cors');
const path = require('path');
const PORT = process.env.PORT || 8000;

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
app.use('/api/notes', require('./routes/note'));


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (_, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });

} else {
    app.get('/', (req, res) => {
        res.json({ message: 'techNotes' });
    });
}


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));