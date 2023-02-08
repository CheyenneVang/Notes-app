const add = require('./utils.js');

const notes = require('./notes.js'); // ./ creates a path
// This is now an object with the properties (addNote, removeNote, readNote, listNote)

// Installing validator.js package from npm
// In the terminal we will type, the command and specify the version we want to install <the version should be listed on the website>
// Type npm i validator@<version number> in the terminal
// Example: npm i validator@10.8.0
// You always want to specify package versions. npm modules do change their apis over time
// When we run this command it's going to go off to the npm servers and grab all of the code for that package and add into our application
// In this example, it added a package-lock.json file and a new directory called node_modules
// node_modules is a folder that contains all the code for the dependencies we installed. inside the folder there is a validator directory, which is the package we installed, and if we open up that validator folder, it has all of the code for that validator package 
// we should not manually edit the node_modules directory and package-lock.json. These will be maintained by npm
// the package-lock.json file contains extra information making npm a bit more faster and more secure. it lists our the version of our dependencies, where they were fetched from, and a sha hash making sure we're getting the exact code that we got previously if we were to install a dependency again
// So now we have our package installed and when we ran that command, the package was even added to package.json
// Now we can move into our application in this case, our file app.js, and load in the package with require function to use the functionality the package provides
// remember, in the require function we will put in a string ('')
// for the core node modules we typed in the module name like ('fs') but for putting our files in the require function we would start with a dot and forward slash to provide the relative path to the file ('./filename)
// for NPM modules, we list our the NPM package name. require is going to return all the stuff that the validator package provides us
// we can create a variable for the require function to store the contents that come back from require
// Now, when it comes to figuring out how to use a package, you have to look at the documentation and figure it out yourself. Look at the documentation for every tool you install
// for validator package on npm website they have different methods and descriptions for how those methods work
// you can also look at examples of how those methods are used
// validator is an object

// const validator = require('validator');






// Challenge: install, require, and use a brand new npm library
// go to npmjs website and search up the library you're going to use
// Instructions: use the chalk library in the project
// install version 2.4.1 of chalk
// load chalk into app.js - so I would use the require function
// use the chalk library to print the string "Success!" to the console in green text
// test your work - by running the script after saving it, we should see the green text "Success!" in the terminal
// bonus: use docs to mess around with other styles. Make text bold and inversed




// My process
// I ran the command npm i chalk@5.2.0 but that wasn't working and I read the npm documentation and the instructions from the udemy and the udemy said to use 2.4.1 version and npm website said Chalk 5 is ESM, if you want to use Chalk you will probably want to use Chalk 4 for now, but I just did want udemy said
// now I declare require function

const chalk = require("chalk");
// console.log(chalk.green("Success!"));
// console.log(chalk.red("Error"));


// How to install and work with global npm packages. Global npm modules are going to allow us to get a new command we can execute in the terminal. Because so far all the packages we have been using are locally installed packages.

// Local NPM modules get loaded into your project code with require function. You can tell it's a local dependency because it's listed in package.json. Like for the chalk package, if you go to package.json it will say chalk in the dependencies object

// When installing a global module, we don't load it in directly to our source files.




// Section 4
// going over file system and command line arguments
// file system allows us to store the user's node data
// command line arguments allow us to get input from the user
// we will be using JSON
// we'll be using it to save our notes
// JSON is essentailly arrays and objects with various properties


// Buffer is a way that node.js represents binary data
// example: const dataBuffer = fs.readFileSync('1-json.json')
// console.log(dataBuffer) but to turn the bits and bytes or binary data into a string we will do console.log(dataBuffer.toString())



// Now we want to be able to get more information with each command to know if the user is trying to add or remove a note is a good start
// If someone is trying to add a note, we need a note title and note body
// If someone is trying to remove a note, we need the title of the note for example to be removed. In order to do that we are going to provide command line options to our command "add" in the terminal by doing --title to be where we set the title and set it equal to double quotes "" and inside the quotes we will have what title we want to create
// In the terminal type node app.js add --title="This is my title"

// But the text doesn't get parsed for us. We are getitng the text including --title
// We need to add some code to manually parse that

// Recap: The arguments (add --title="This is my title") we wrote in node are passed through into our application and we can access them through process.argv

// npm packages can make it easy to set up our commands and options as we want

// Now we are going to install the npm package, yargs

// yargs parses our argument and command into an object so that they're easy to access
// We will call the command method on yargs and pass to it an object. This is our options object where we can customize how the commands should work.


const yargs = require('yargs');

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true, // The demandOption property is set to false by default. Here we are setting it to true to make a title required and our add command to work correctly.
            type: 'string' // We want to make sure our inputs are only accepting string values
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    }, // The value of the builder property is an object.
    handler: function(argv) { // The handler function is the placeholder message for now in our notes app
        // console.log('Adding a new note!', argv) // Note: don't add a semi colon here because when I did that it returned in the temrinal that there was an Unexpected identifier in the handler: function(), but after removing the semi colon it printed in the terminal

        // console.log('Title: ' + argv.title)
        // console.log('Body: ' + argv.body)

        notes.addNote(argv.title, argv.body)
}
});



// Create remove command
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
        // console.log('Removing the note')
        notes.removeNote(argv.title)
    }
})


// Create read command
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
        //console.log('Reading the note')
        notes.readNote(argv.title)
    }
})



// Create list command
yargs.command({
    command: 'list',
    describe: 'List a note',
    handler: function () {
        // console.log('Listing the note')
        notes.listNotes()
    } 
})


console.log(yargs.argv); // argv is a property of yargs, when we access the argv propety on yargs, yargs knows to parse the arguments

// Another way to do to do console.log(yargs.argv) is
// yargs.parse()
// It doesn't take any arguments and we can just call it like that. It parses the arguments with the options we've included in the commands.




// Now we'll be using fs core module in the notes.js file
// fs core module only knows how to work with string data





