const fs = require('fs');
const express = require('express');
const path = require('path');
// const notesRoutes = require('./public/js/index.js');
// const index = require('./public/assets/js/index.js');

const app = express();
const PORT = process.env.PORT || 5001;

function makeId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use('/api', index);
// app.use('/api', notesRoutes)

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    let noteList = JSON.parse(fs.readFileSync('./db/db.json','utf8'));
    let noteId = makeId(8);
    newNote.id = noteId;
    noteList.push(newNote);

    fs.writeFileSync('./db/db.json', JSON.stringify(noteList));
    return res.json(noteList);


});

app.delete('/api/notes/:noteId', (req, res) => {
    let noteList = JSON.parse(fs.readFileSync('./db/db.json','utf8'));
    let noteId = req.params.noteId.toString();

    noteList = noteList.filter(selected => {
        return selected.id !== noteId;
    })
    fs.writeFileSync('./db/db.json', JSON.stringify(noteList));
    res.json(noteList);
});

app.listen(PORT, () => console.log('listening on port ' + PORT));

// module.exports = {
//     getNotes: '/api/notes',
//     deleteNote: '/api/notes/:noteId'
//   };