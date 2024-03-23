// index.js

// Import the 'fs' module
const fs = require('fs');

// Create a new file using fs.writeFile
fs.writeFile('example.txt', 'Hello, this is a text file created using the fs module!. My first cretaed file', (err) => {
  if (err) {
    console.error('Error creating the file:', err);
  } else {
    console.log('File created successfully!');
  }
});

// Read the contents of a file using fs.readFile
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
  } else {
    console.log('File contents:', data);
  }
});

// Rename a file using fs.rename
fs.rename('example.txt', 'new-example.txt', (err) => {
  if (err) {
    console.error('Error renaming the file:', err);
  } else {
    console.log('File renamed successfully!');
  }
});

// Delete a file using fs.unlink
fs.unlink('new-example.txt', (err) => {
  if (err) {
    console.error('Error deleting the file:', err);
  } else {
    console.log('File deleted successfully!');
  }
});