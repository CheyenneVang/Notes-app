const notes = require('./notes.js');
const chalk = require("chalk"); // npm i chalk@2.4.1 version
const yargs = require('yargs');
// Add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        notes.addNote(argv.title, argv.body)
    }
});
// Remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.removeNote(argv.title)
    }
})
// Read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.readNote(argv.title)
    }
})
// List command
yargs.command({
    command: 'list',
    describe: 'List a note',
    handler: function () {
        notes.listNotes()
    } 
})
console.log(yargs.argv); // argv is a property of yargs, when we access the argv propety on yargs, yargs knows to parse the arguments





