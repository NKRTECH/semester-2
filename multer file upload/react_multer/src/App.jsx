// src/App.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading, setError } from './features/fileUploadSlice';
import axios from 'axios';

function App() {
 const [selectedFile, setSelectedFile] = useState(null);
 const [category, setCategory] = useState('images'); // Default category is 'images'
 const [username, setUsername] = useState(''); // Assuming you have access to the username
 const loading = useSelector((state) => state.fileUpload.loading);
 const error = useSelector((state) => state.fileUpload.error);
 const dispatch = useDispatch();

 const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
 };

 const handleCategoryChange = (event) => {
    setCategory(event.target.value);
 };

 const handleUsernameChange = (event) => {
    setUsername(event.target.value);
 };

 const handleFileUpload = async () => {
    try {
      dispatch(setLoading(true));
      let formData = new FormData();
      formData.append('category', category);
      formData.append('username', username);
      formData.append('file', selectedFile);
    //   console.log(formData.get('file'));
    //   for(let [name, value] of formData) {
    //     console.log(`${typeof name} = ${typeof value}`); // key1 = value1, then key2 = value2
    //   }

    const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
      dispatch(setLoading(false));
      console.log(response.data);
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      console.log(error);
    }
 };

 return (
    <div>
      <h1>File Upload Example</h1>
      <input name='file' type="file" onChange={handleFileChange} />
      <select value={category} onChange={handleCategoryChange}>
        <option value="images">Images</option>
        <option value="documents">Documents</option>
        <option value="videos">Videos</option>
        {/* Add more options as needed */}
      </select>
      <input type="text" value={username} onChange={handleUsernameChange} placeholder="Enter username" />
      <button onClick={handleFileUpload}>Upload</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
 );
}

export default App;

// // src/App.jsx

// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setFile, setLoading, setError } from './features/fileUploadSlice';
// import axios from 'axios';

// function App() {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const loading = useSelector((state) => state.fileUpload.loading);
//     const error = useSelector((state) => state.fileUpload.error);
//     const dispatch = useDispatch();

//     const handleFileChange = (event) => {
//         setSelectedFile(event.target.files[0]);
//     };

//     const handleFileUpload = async () => {
//         try {
//             dispatch(setLoading(true));
//             const formData = new FormData();
//             formData.append('file', selectedFile);
//             formData.append('category', 'images');
//             formData.append('username', 'nayan');
//             const response = await axios.post('http://localhost:5000/upload', formData);
//             dispatch(setFile(selectedFile.name));
//             dispatch(setLoading(false));
//             console.log(response.data);
//         } catch (error) {
//             dispatch(setError(error.message));
//             dispatch(setLoading(false));
//         }
//     };

//     return (
//         <div>
//             <h1>File Upload Example</h1>
//             <input type="file" onChange={handleFileChange} />
//             <button onClick={handleFileUpload}>Upload</button>
//             {loading && <p>Loading...</p>}
//             {error && <p>Error: {error}</p>}
//         </div>
//     );
// }

// export default App;
