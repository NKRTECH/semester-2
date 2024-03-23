// Select the username and password input elements from the DOM
const username = document.querySelector('#username');
const password = document.querySelector('#password');

// Function to set a cookie with a given name, value, and optional expiration in days
function setCookie(name, object, days) {
    // Output the name of the cookie for debugging
    console.log('name of cookie: ', name);
    // Output the value of the cookie for debugging
    console.log('value of cookie: ', object);
    // Convert the object to a JSON string
    const stringifiedObject = JSON.stringify(object);
    // Output the stringified object for debugging
    console.log('stringifiedObject: ', stringifiedObject);
    // Encode the JSON string to make it safe for use in a URL
    const encodedStringifiedObject = encodeURIComponent(stringifiedObject);
    // Output the encoded stringified object for debugging
    console.log('encodedStringifiedObject: ', encodedStringifiedObject);
    // Initialize an empty string for the expiration date
    let expires = "";
    // If an expiration period is specified, calculate the expiration date
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days *   24 *   60 *   60 *   1000));
        expires = "; expires=" + date.toUTCString();
    }
    // Set the cookie with the name, encoded value, and expiration date
    document.cookie = `${name}=${encodedStringifiedObject}${expires}; path=/`;
    // Output the cookie string for debugging
    console.log('cookie set: ', document.cookie);
}

// Function to get a cookie by name and parse it into an object
function getCookie(callback) {
    // Define the prefix for the cookie name
    const nameEQ = 'credentials=';
    // Split the document.cookie string into individual cookies
    const ca = document.cookie.split(';');
    // Output the array of cookies for debugging
    console.log(ca);
    console.log('length:   ',ca.length);
    // Loop through each cookie
    for(let i =   0; i < ca.length; i++) {
        let c = ca[i];
        console.log(c);
        console.log(c.indexOf(nameEQ));
        console.log(c.charAt(0));
        // Trim leading spaces
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        // Check if the cookie starts with the specified name
        console.log('c.indexOf(nameEQ):  ',c.indexOf(nameEQ));
        if (c.indexOf(nameEQ) ===   0) {
            try {
                // Extract the value of the cookie
                const decodedStringifiedObject = c.substring(nameEQ.length, c.length);
                // Output the decoded stringified object for debugging
                console.log('decodedStringifiedObject:  ', decodedStringifiedObject);
                // Parse the value from a JSON string to an object
                const parsedObject = JSON.parse(decodeURIComponent(decodedStringifiedObject));
                // Output the parsed object for debugging
                console.log('parsedObject:  ', parsedObject);
                // Call the callback function with the parsed object
                callback(parsedObject);
                // Output the result of the callback for debugging
                console.log('callback:  ', callback(parsedObject));
                return;
            } catch (e) {
                // Handle any errors that occur during parsing
                console.error("Failed to parse cookie:", e);
                callback(null);
                return;
            }
        }
    }
    // If the cookie is not found, call the callback function with null
    callback(null);
}

// Function to update the input fields with the values from a cookie object
function updateInputFields(cookieObject) {
    // Check if the cookie object exists
    if (cookieObject) {
        // Update the username and password input fields with the values from the cookie
        username.value = cookieObject.username;
        password.value = cookieObject.password;
        // Output the updated username and password for debugging
        console.log('username: ', username.value);
        console.log('password: ', password.value);
    } else {
        // Alert the user if no cookie was found
        alert('No cookie found');
    }
}

// Function to remove a cookie by setting its expiration date to a time in the past
function removeCookie(name) {
    // Set the cookie's value to an empty string and its expiration date to a time in the past
    document.cookie = `${name}=; expires=Thu,   01 Jan   1970   00:00:00 UTC; path=/;`;
    // Clear the input fields
    username.value = '';
    password.value = '';
    // Output the updated cookie string for debugging
    console.log('cookie removed: ', document.cookie);
}

// Event listener for the form submission
const form = document.querySelector('#form');
form.addEventListener('submit', (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Store the current values of the username and password inputs
    const usernameValue = username.value;
    const passwordValue = password.value;
    // Output the form-submitted username and password for debugging
    console.log('form-username: ', usernameValue);
    console.log('form-password: ', passwordValue);
    // Set the cookie with the username and password values
    setCookie('credentials', {username: usernameValue, password: passwordValue},   365);
    // Clear the input fields
    username.value = '';
    password.value = '';
});

function setMultipleCookies(cookiesObject, days) {
    for (const [name, value] of Object.entries(cookiesObject)) {
        setCookie(name, value, days);
    }
}


// Attach the getCookie and removeCookie functions to the window object to make them globally accessible
window.getCookie = getCookie;
window.removeCookie = removeCookie;

//******************************************************************************* */

//****************************without giving extensive comments****************************/

/*
// Select the username and password input elements from the DOM
const username = document.querySelector('#username');
const password = document.querySelector('#password');

// Function to set a cookie with a given name, value, and optional expiration in days
function setCookie(name, object, days) {
    console.log('name of cookie: ', name);
    console.log('value of cookie: ', object);
    const stringifiedObject = JSON.stringify(object);
    console.log('stringifiedObject: ', stringifiedObject);
    const encodedStringifiedObject = encodeURIComponent(stringifiedObject);
    console.log('encodedStringifiedObject: ', encodedStringifiedObject);
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days *   24 *   60 *   60 *   1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${encodedStringifiedObject}${expires}; path=/`;
    console.log('cookie set: ', document.cookie);
}

// Function to get a cookie by name and parse it into an object
function getCookie(callback) {
    const nameEQ = 'credentials=';
    const ca = document.cookie.split(';');
    console.log(ca);
    for(let i =   0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) ===   0) {
            try {
                const decodedStringifiedObject = c.substring(nameEQ.length, c.length);
                console.log('decodedStringifiedObject:  ', decodedStringifiedObject);
                const parsedObject = JSON.parse(decodeURIComponent(decodedStringifiedObject));
                console.log('parsedObject:  ', parsedObject);
                callback(parsedObject);
                console.log('callback:  ', callback(parsedObject));
                return;
            } catch (e) {
                console.error("Failed to parse cookie:", e);
                callback(null);
                return;
            }
        }
    }
    callback(null);
}

// Function to update the input fields with the values from a cookie object
function updateInputFields(cookieObject) {
    if (cookieObject) {
        username.value = cookieObject.username;
        password.value = cookieObject.password;
        console.log('username: ', username.value);
        console.log('password: ', password.value);
    } else {
        alert('No cookie found');
    }
}

// Function to remove a cookie by setting its expiration date to a time in the past
function removeCookie(name) {
    document.cookie = `${name}=; expires=Thu,   01 Jan   1970   00:00:00 UTC; path=/;`;
    username.value = '';
    password.value = '';
    console.log('cookie removed: ', document.cookie);
}

// Event listener for the form submission
const form = document.querySelector('#form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const usernameValue = username.value;
    const passwordValue = password.value;
    console.log('form-username: ', usernameValue);
    console.log('form-password: ', passwordValue);
    setCookie('credentials', {username: usernameValue, password: passwordValue},   365);
    username.value = '';
    password.value = '';
});

// Attach the getCookie and removeCookie functions to the window object to make them globally accessible
window.getCookie = getCookie;
window.removeCookie = removeCookie;

*/

//***********************************practice code************************************* */

// const username = document.querySelector('#username');
// const password = document.querySelector('#password');

// function setCookie(object){
//     const stringifiedObject = JSON.stringify(object);
//     const encodedstringifiedObject = encodeURIComponent(object);
//     console.log(stringifiedObject);
//     console.log(encodedstringifiedObject);

//     document.cookie = `${stringifiedObject};`;
//     // const expirationDate = new Date();
//     // expirationDate.setFullYear(expirationDate.getFullYear() + 1);

//     // document.cookie = `${name}=${encodedvalue}; expires=${expirationDate.toUTCString()}; path=/;`;
// }

// function getCookie(){
//     const decodedstringifiedObject = decodeURIComponent(document.cookie);
//     const parsedObject = JSON.parse(document.cookie);
//     console.log(decodedstringifiedObject);
//     console.log(parsedObject);

//     username.value = parsedObject.username;
//     password.value = parsedObject.password;
// }

// const form = document.querySelector('#form');
// let usernameValue;
// let passwordValue;
// form.addEventListener('submit', (event) => {
//     event.preventDefault();
//     usernameValue = username.value;
//     passwordValue = password.value;
//     console.log(usernameValue);
//     console.log(passwordValue);

//     setCookie({username: usernameValue, password: passwordValue});
//     username.value = '';
//     password.value = '';
// })

// let object = {username: usernameValue, password: passwordValue}
// // function removeCookie(object) {
// //     console.log(document.cookie);
// //     // document.cookie = `${object}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
// //     for (let key in object) {
// //         console.log(key);
// //         console.log(object[key]);
// //         document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
// //     }
// //     console.log(document.cookie);
// // }

// function removeCookie() {
//     document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
//     document.cookie = 'password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
//     console.log('Cookies removed successfully');
// }


// // Set a cookie
// setCookie({ username: 'testUser', password: 'testPassword' });

// // Verify that the cookie is set correctly
// console.log(document.cookie); // You should see the cookie string in the console

// // Remove the cookie
// removeCookie();

// // Verify that the cookie is removed
// console.log(document.cookie); // You should not see the cookie string in the console