// Function to set a cookie with user input

// function setCookie() {
//     const userInput = prompt("Please enter the value for the username cookie:");
//     const expirationDate = new Date();
//     expirationDate.setFullYear(expirationDate.getFullYear() + 1); // Expires in 1 year
//     const cookieValue = `username=${userInput};expires=${expirationDate.toUTCString()};path=/`;
//     document.cookie = cookieValue;
// }

function setCookie() {
    const userInput1 = encodeURIComponent(prompt("Please enter the value for the username cookie:"));
    const userInput2 = encodeURIComponent(prompt("Please enter the value for the email cookie:"));

    console.log(userInput1);
    console.log(userInput2);

    // Construct a JavaScript object with the user inputs
    const cookieData = {
        username: userInput1,
        email: userInput2
    };

    // Convert the JavaScript object into a JSON string
    const jsonString = JSON.stringify(cookieData);
    console.log(jsonString);

    // Set expiration date for the cookie (1 year from now)
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);

    // Construct the cookie string with the JSON data
    const cookieValue = `${jsonString}; expires=${expirationDate.toUTCString()}; path=/`;

    // Set the cookie
    document.cookie = cookieValue;
    console.log(document.cookie);
}


//******************************** */


//******************************************* */
// Function to get a cookie

// function getCookie() {
//     const cookieNames = ["username", "email"]; // Array of cookie names to retrieve

//     const decodedCookie = decodeURIComponent(document.cookie);
//     const cookieArray = decodedCookie.split(';');

//     for (let i = 0; i < cookieArray.length; i++) {
//         let cookie = cookieArray[i];

//         while (cookie.charAt(0) === ' ') {
//             cookie = cookie.substring(1);
//         }

//         for (let j = 0; j < cookieNames.length; j++) {
//             const name = cookieNames[j] + "=";
//             if (cookie.indexOf(name) === 0) {
//                 console.log(cookie.substring(name.length, cookie.length));
//             }
//         }
//     }

//     console.log("Cookies retrieval complete");
// }

console.log(`outside function: ${document.cookie}`);

function getCookie(){
        if (document.cookie.length != 0){
          let decodedCookie = decodeURIComponent(document.cookie);
          let object2 = JSON.parse(decodedCookie);
          console.log(object2);
          alert("Name=" + object2.username+ "\nEmail=" + object2.email);
        }
        else{
          alert("cookie is not set yet");
        }
    }


///******************************** */

// function getCookie() {
//     const name = "username=";
//     const decodedCookie = decodeURIComponent(document.cookie);
//     const cookieArray = decodedCookie.split(';');
//     for (let i = 0; i < cookieArray.length; i++) {
//         let cookie = cookieArray[i];
//         while (cookie.charAt(0) === ' ') {
//             cookie = cookie.substring(1);
//         }
//         if (cookie.indexOf(name) === 0) {
//             console.log(cookie.substring(name.length, cookie.length));
//             return;
//         }
//     }
//     console.log("Username cookie not found");
// }


//************************LLLLLLLLLLLLLLLLLLLL********************************** */
// Function to set data in local storage with user input
function setLocalStorage() {
    const userInput = prompt("Please enter the value for the local storage key:");
    localStorage.setItem('key', userInput);
}

// Function to get data from local storage
function getLocalStorage() {
    let storedValue = localStorage.getItem('key');
    console.log(storedValue);
}


//***************SSSSSSSSSSSSSSSSSSSSSSSSS******** */
// Function to set data in session storage with user input
function setSessionStorage() {
    const userInput = prompt("Please enter the value for the session storage key:");
    sessionStorage.setItem('tempKey', userInput);
}

// Function to get data from session storage
function getSessionStorage() {
    let tempData = sessionStorage.getItem('tempKey');
    console.log(tempData);
}