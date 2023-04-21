const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listeners(PORT, () => console.log('listening on port ' + PORT));