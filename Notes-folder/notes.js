const fs = require('fs')
const chalk = require('chalk')

// Add note function 
const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

// Remove note function
const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter(function (note) {
        return note.title != title
    })
    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
}

// Read note function
const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('Note not found!'))
    }
}

// List note function will print all notes to the terminal
const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('Your notes'))
    notes.forEach((note) => {
        console.log(note.title)
    }) 
}

// The saveNotes function will take in an array
const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

// The loadNotes function will return an array of notes
const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json') // The file we will be reading and writing to
        const dataJSON = dataBuffer.toString() // Converting dataBuffer into a string
        return JSON.parse(dataJSON) // Parsing the data
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote,
    listNotes: listNotes
}