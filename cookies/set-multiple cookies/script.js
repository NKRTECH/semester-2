const username = document.querySelector('#username');
const password = document.querySelector('#password');

function setMultipleCookies(cookiesObject, days) {
    for (const [name, value] of Object.entries(cookiesObject)) {
        const stringifiedValue = JSON.stringify(value);
        const encodedStringifiedValue = encodeURIComponent(stringifiedValue);
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days *   24 *   60 *   60 *   1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = `${name}=${encodedStringifiedValue}${expires}; path=/`;
        console.log(`Cookie ${name} set: `, document.cookie);
    }
}

function getCookie(name) {
    const nameEQ = name + "=";
    console.log('nameEQ:  ',nameEQ);
    const ca = document.cookie.split(';');
    console.log('ca:  ',ca);
    for(let i =   0; i < ca.length; i++) {
        let c = ca[i];
        console.log('c:  ',c);
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        console.log('c.indexOf(nameEQ):  ',c.indexOf(nameEQ));
        if (c.indexOf(nameEQ) ===   0) {
            try {
                const extractedStringifiedValue = c.substring(nameEQ.length, c.length);
                console.log('extractedStringifiedValue:  ',extractedStringifiedValue);
                const decodedExtractedStringifiedValue = decodeURIComponent(extractedStringifiedValue);
                console.log('decodedExtractedStringifiedValue:  ',decodedExtractedStringifiedValue);
                const parsedValue = JSON.parse(decodedExtractedStringifiedValue);
                console.log('parsedValue:  ',parsedValue);
                return parsedValue;
            } catch (e) {
                console.error("Failed to parse cookie:", e);
                return null;
            }
        }
    }
    return null;
}

// Function to update the input fields with the values from a cookie object
function updateInputFields(cookieObject) {
    if (cookieObject) {
        username.value = cookieObject.username;
        password.value = cookieObject.password;
        console.log('Username: ', username.value);
        console.log('Password: ', password.value);
    } else {
        alert('No cookie found');
    }
}

// Function to remove a cookie by setting its expiration date to a time in the past
function removeCookie(name) {
    document.cookie = `${name}=; expires=Thu,   01 Jan   1970   00:00:00 UTC; path=/;`;
    username.value = '';
    password.value = '';
    console.log('Cookie removed: ', document.cookie);
}

// Event listener for the form submission
const form = document.querySelector('#form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const usernameValue = username.value;
    const passwordValue = password.value;
    console.log('Form-username: ', usernameValue);
    console.log('Form-password: ', passwordValue);
    
    // Set multiple cookies
    const cookiesToSet = {
        'credentials': {username: usernameValue, password: passwordValue},
        // Add more cookies as needed
        'information': {name: 'John', age: 30},
    };
    setMultipleCookies(cookiesToSet,   365);
    
    username.value = '';
    password.value = '';
});

// Button to get the cookie and update the input fields
document.querySelector('#getCookieButton').addEventListener('click', () => {
    const credentials = getCookie('credentials');
    updateInputFields(credentials);
});

// Button to remove the cookie
document.querySelector('#removeCookieButton').addEventListener('click', () => {
    removeCookie('credentials');
});

document.querySelector('#getCookieByNameButton').addEventListener('click', () => {
    const nameOfCookie = document.querySelector('#getCookieByName').value;
    const cookie = getCookie(nameOfCookie);
    document.querySelector('#getCookieByNameResult').textContent = JSON.stringify(cookie,null);
});

// Attach the getCookie and removeCookie functions to the window object to make them globally accessible
window.getCookie = getCookie;
window.removeCookie = removeCookie;



//*************Below is detailed explanation of setMultipleCookies function**************** */
/*
// Function to set multiple cookies with a given object and optional expiration in days
// Define a function named setMultipleCookies that accepts two parameters:
// - cookiesObject: an object where each key-value pair represents a cookie name and its value
// - days: an optional parameter specifying the number of days until the cookie should expire
function setMultipleCookies(cookiesObject, days) {
    // Use a for...of loop to iterate over the entries of the cookiesObject
    // Object.entries(cookiesObject) returns an array of [key, value] pairs
    // The for...of loop is a convenient way to iterate over arrays and other iterable objects
    for (const [name, value] of Object.entries(cookiesObject)) {
        // The const keyword is used to declare a constant variable that cannot be reassigned
        // The [name, value] syntax is called destructuring assignment, which allows us to unpack values from arrays or properties from objects into distinct variables
        // In this case, we're unpacking the key and value from each entry in the array returned by Object.entries

        // Convert the value to a JSON string using JSON.stringify
        // JSON.stringify is a method that converts a JavaScript value to a JSON string
        // This is necessary because cookies can only store strings, so if the value is an object or an array, it needs to be converted to a string format before being stored
        const stringifiedValue = JSON.stringify(value);

        // URL-encode the JSON string using encodeURIComponent
        // encodeURIComponent is a global JavaScript function that encodes a URI component by replacing each instance of certain characters by one, two, three, or four escape sequences representing the UTF-8 encoding of the character
        // This is done to ensure that the stringified JSON value doesn't contain any characters that could interfere with the cookie syntax
        const encodedStringifiedValue = encodeURIComponent(stringifiedValue);

        // Initialize an empty string for the expires attribute of the cookie
        // The expires attribute determines when the cookie should be deleted
        // If no expiration date is set, the cookie will be a session cookie and will be deleted when the browser is closed
        let expires = "";

        // Check if the days parameter is provided
        // If days is truthy (not null, undefined, false,   0, NaN, or an empty string), then it means we want the cookie to persist for a certain number of days
        if (days) {
            // Create a new Date object for the current date and time
            // The Date constructor creates a new Date object with the current date and time
            let date = new Date();

            // Calculate the new date by adding the number of milliseconds in days
            // There are   24 hours in a day,   60 minutes in an hour,   60 seconds in a minute, and   1000 milliseconds in a second
            // So, to find the number of milliseconds in days, we multiply the number of days by the number of milliseconds in a day
            date.setTime(date.getTime() + (days *   24 *   60 *   60 *   1000));

            // Format the date as a UTC string using toUTCString
            // The toUTCString method converts a Date object to a string, according to universal time
            // This is the format required for the expires attribute of a cookie
            expires = "; expires=" + date.toUTCString();
        }

        // Construct the full cookie string by combining the name, encoded value, expires attribute, and path
        // The path attribute is set to '/', which means the cookie is available across the entire website
        // The cookie string is constructed using template literals, which allow embedding expressions inside string literals using ${} syntax
        // Template literals make it easier to construct strings that include variable values
        document.cookie = `${name}=${encodedStringifiedValue}${expires}; path=/`;

        // Log a message to the console indicating that the cookie has been set
        // This is useful for debugging purposes
        // The console.log method outputs a message to the web console
        console.log(`Cookie ${name} set: `, document.cookie);
    }
}
*/


//*************Below is detailed explanation of getCookie function**************** */
/*

// Function to get a cookie by name and parse it into an object
// Define a function named getCookie that accepts one parameter:
// - name: the name of the cookie we want to retrieve
function getCookie(name) {
    // Create a string that combines the cookie name with an equals sign
    // This will be used later to search for the cookie in the document.cookie string
    const nameEQ = name + "=";

    // Split the document.cookie string into an array of individual cookies
    // The document.cookie string is a semi-colon separated list of all cookies for the current domain
    const ca = document.cookie.split(';');

    // Start a for loop to iterate over each item in the array of cookies
    for(let i =   0; i < ca.length; i++) {
        // Assign the current cookie string to a variable c
        let c = ca[i];

        // Remove leading whitespace from the cookie string
        // The charAt method returns the character at the specified index in a string
        // The substring method extracts characters from a string between two specified indices
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);

        // Check if the current cookie string starts with the nameEQ string
        // The indexOf method returns the position of the first occurrence of a specified value in a string
        // If the cookie name matches, the position will be   0
        if (c.indexOf(nameEQ) ===   0) {
            // Try to parse the cookie value
            try {
                // Extract the value part of the cookie string by removing the nameEQ prefix
                // The substring method is used again to get the part of the string after the equals sign
                // Visualize it like this:
                // c = "credentials=%7B%22username%22%3A%22nkr%22%2C%22password%22%3A%22nkr%22%7D"
                // nameEQ = "credentials="
                // We want to remove "credentials=" from the start of c, so we start at the character after "="
                // c.substring(nameEQ.length, c.length) => c.substring(11, c.length)
                // Result: "%7B%22username%22%3A%22nkr%22%2C%22password%22%3A%22nkr%22%7D"
                const extractedStringifiedValue = c.substring(nameEQ.length, c.length);

                // Log the extracted stringified value to the console for debugging purposes
                console.log('extractedStringifiedValue:  ',extractedStringifiedValue);

                // Decode the URL-encoded string back into a regular string
                // decodeURIComponent is a global JavaScript function that decodes a URI component previously created by encodeURIComponent or by a similar routine
                // Imagine the string "%7B%22username%22%3A%22nkr%22%2C%22password%22%3A%22nkr%22%7D" as a puzzle piece that needs to be put back together
                // decodeURIComponent will take each encoded character and replace it with the original character
                // Result: '{"username":"nkr","password":"nkr"}'
                const decodedExtractedStringifiedValue = decodeURIComponent(extractedStringifiedValue);

                // Log the decoded stringified value to the console for debugging purposes
                console.log('decodedExtractedStringifiedValue:  ',decodedExtractedStringifiedValue);

                // Parse the JSON string into a JavaScript object or value
                // JSON.parse is a method that parses a JSON string and constructs the JavaScript value or object described by the string
                // Imagine the string '{"username":"nkr","password":"nkr"}' as a blueprint for building a house
                // JSON.parse will read the blueprint and build the house, giving us a JavaScript object
                // Result: {username: "nkr", password: "nkr"}
                const parsedValue = JSON.parse(decodedExtractedStringifiedValue);

                // Log the parsed value to the console for debugging purposes
                console.log('parsedValue:  ',parsedValue);

                // Return the parsed value
                // Once a match is found and successfully parsed, the function exits and returns the value
                return parsedValue;
            } catch (e) {
                // If an error occurs during parsing, log the error to the console
                // The catch block is executed if an exception is thrown in the try block
                console.error("Failed to parse cookie:", e);

                // Return null to indicate that the cookie could not be retrieved or parsed
                return null;
            }
        }
    }

    // If the function hasn't returned yet, it means the cookie wasn't found
    // Return null to indicate that no matching cookie was found
    return null;
}

*/