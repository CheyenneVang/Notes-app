console.log('utils.js');

// const anotherName = 'Mike';

// module.exports = anotherName;
// What we assign to module.exports is what other files can get access to


// Now let's try to export a function
// Let's declare a function
const add = function (a, b) {
    return a + b;
}

module.exports = add;