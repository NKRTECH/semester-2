// Set a cookie with various attributes
function setCookie(name, value, daysToExpire, path, secure) {
    let cookieString = `${name}=${value}`;
  
    if (daysToExpire) {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + daysToExpire);
      cookieString += `;expires=${expirationDate.toUTCString()}`;
    }
  
    if (path) {
      cookieString += `;path=${path}`;
    }
  
    if (secure) {
      cookieString += `;secure`;
    }
  
    document.cookie = cookieString;
  }
  
  // Example usage of setCookie function
  setCookie('username', 'johndoe', 30, '/admin', true);