// server/index.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const createDestination = (req, file, cb) => {
    // Assuming you have user information available in the request
    const username = req.body.username;
    const category = req.body.category;
    if (!username || !category) {
        return cb(new Error('Username or category is missing'), null);
    }
    const userDirectory = path.join('uploads', username);
    const categoryDirectory = path.join(userDirectory, category);
    fs.mkdirSync(categoryDirectory, { recursive: true }); // Create category directory if it doesn't exist
    cb(null, categoryDirectory);
};

// // Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Assuming you have user information available in the request
        console.log('passing thru destination');
        const username = req.body.username;
        console.log('req.body.username: ',username);
        const category = req.body.category;
        if (!username || !category) {
            return cb(new Error('Username or category is missing'), null);
        }
        const userDirectory = path.join('uploads', username);
        const categoryDirectory = path.join(userDirectory, category);
        fs.mkdirSync(categoryDirectory, { recursive: true }); // Create category directory if it doesn't exist
        cb(null, categoryDirectory);
    },
    filename: function (req, file, cb) {
        console.log('passing thru filename');
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         console.log('passing thru destination: ',file);
//         console.log('req.body: ',req.body);

//         // cb(null, 'uploads/');
        
//         const username = req.body.username;
//         const category = req.body.category;
//         if (!username || !category) {
//             return cb(new Error('Username or category is missing'), null);
//         }
//         const userDirectory = path.join('uploads', username);
//         const categoryDirectory = path.join(userDirectory, category);
//         fs.mkdirSync(categoryDirectory, { recursive: true });
//         cb(null, categoryDirectory);
//     },
//     filename: function (req, file, cb) {
//         console.log('passing thru filename: ',file);
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });


const upload = multer({ storage: storage });

// Route for handling file uploads
app.post('/upload', upload.single('file'), (req, res) => {
    console.log('post: ',req.body); // Log the request body to see the additional fields
    console.log(req.file); // Log the file information
    res.send('File uploaded successfully');
});

// app.post('/upload', (req, res, next) => {
//     // console.log('Request headers:', req.headers);
//     console.log('Request body:', req.body);
//     next();
// }, upload.single('file'), (req, res) => {
//     console.log(req.body); // Log the request body to see the additional fields
//     console.log(req.file); // Log the file information
//     res.send('File uploaded successfully');
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


//************************************************* */


// const storage = multer.diskStorage({
    //     destination: function (req, file, cb) {
//         const username = req.user.username; // Assuming you have user information available in the request
//         const userUploadsDir = path.join('uploads', username);
//         fs.mkdirSync(userUploadsDir, { recursive: true }); // Create directory if it doesn't exist
//         cb(null, userUploadsDir);
//     },
//     filename: function (req, file, cb) {
    //         cb(null, Date.now() + '-' + file.originalname);
    //     }
// });

    // const storage = multer.diskStorage({
    //     destination: function (req, file, cb) {
    //         cb(null, 'uploads/');
    //     },
    //     filename: function (req, file, cb) {
    //         cb(null, Date.now() + '-' + file.originalname);
    //     }
    // });


    //************************************************ */

// // server/index.js

// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const cors = require('cors');
// const fs = require('fs');


// const app = express();
// app.use(cors());
// // app.use(express.json());
// const PORT = process.env.PORT || 5000;


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//         console.log('dest')
//         console.log('dest file: ',file)
//         console.log('dest file: ',req.body)
//     },
//     filename: function (req, file, cb) {
//         console.log('from filename disk: ',req.body)
//         console.log(req.file)
//         console.log('filename disk: ',file)
//         console.log('filename disk')
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({ storage: storage });

// app.post('/upload', upload.single('file'), (req, res) => {
//     res.send('File uploaded successfully');
//     console.log('post')
//     console.log(req.body)
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
