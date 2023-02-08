// notes.js is going to define a function that gets called in app.js

// we are going to use fs to read from a file. so here we need to "load it in" or create the variable of it
const fs = require('fs')
const chalk = require('chalk')


// Add note function. It will get the note saved.
// Here we will load the data, add/push the data to an array, and then save that data 
const addNote = function (title, body) {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    // duplicateNote array will have zero items if no duplicates were found and then we can add the code to execute
    if (!duplicateNote) {
        notes.push({
            title: title, // Creating a title and body property that will set to the value which is the argument coming through this addNote function
            body: body
        })
    
        saveNotes(notes) // Saving the new note (with what has been pushed in to the array)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}



// Remove note function
const removeNote = function (title) {
    // console.log(title)
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


// List note function
const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.inverse('Your notes'))

    notes.forEach((note) => {
        console.log(note.title)
    })
}




// Data can come from different places in our application so here we will create a resuable function to save the data 
// This function will take in an argument which will be the array
// When we want to save data, we take the object/array, use JSON.stringify, and then write it to the file system or fs
const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

// This will be a resuable function we're creating
// It does not take in any arguments
// It will return an array of notes
// This code will work if there is a file and it contains JSON. It will fail if otherwise.
const loadNotes = function () {
    try { // if one of these codes fail or throw an error, the code will stop and run catch instead
        const dataBuffer = fs.readFileSync('notes.json') // this is the file we will be reading and writing to 
        const dataJSON = dataBuffer.toString() // we're converting dataBuffer into a string
        return JSON.parse(dataJSON) // now we'll parse it
    } catch (e) {
        return []
    }
}


// We are exporting an object with these properties, one for each function. They can be exported and used by another file like app.js.
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}