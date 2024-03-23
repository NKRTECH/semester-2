// Importing the 'crypto' module from Node.js
const crypto = require('crypto');

// Defining the SHA256 hash to find a match for
const hashToMatch = '0e12831a7047f759733b21f028525039607350b1b1b4fe904595427e72ea0d9b';

// Starting a loop to iterate through all three-digit numbers (0 to 999)
for (let i = 0; i < 1000; i++) {
    // Converting the current number 'i' to a string and zero-padding it if necessary to ensure it's three digits long
    const numberStr = String(i).padStart(3, '0');
    
    // Calculating the SHA256 hash of the current number string using the 'crypto' module
    const hashResult = crypto.createHash('sha256').update(numberStr).digest('hex');
    
    // Checking if the computed hash matches the provided hash we're trying to find a match for
    if (hashResult === hashToMatch) {
        // If a match is found, logging the matching input number string to the console
        console.log("Matching input found:", numberStr);
        // Exiting the loop since we've found a match
        break;
    }
}
