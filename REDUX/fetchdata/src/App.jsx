// App.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userslist, fetchUsers, clearuser } from "./users/userSlice";
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const users = useSelector(userslist);
  const status = useSelector((state) => state.users.status);

  const showdata = () => {
    if (status === 'idle') {
      // console.log(fetchUsers())
      console.log(fetchUsers.fulfilled())
      dispatch(fetchUsers());
    } else if (status === 'succeeded') {
      dispatch(clearuser());
    }
  }

  return (
    <>
      <button className="action-button" onClick={showdata}>{status === 'idle' ? 'SHOW USER INFORMATION' : 'CLEAR'}</button>
      {status==='loading' && <h1 className="loading-message">Loading...</h1>}
      {status === 'succeeded' &&
            <div className="app-container">
            <h2 className="app-title">Users List</h2>
              <ul className="user-list">
                {users.users.map((user) => (
                  <li key={user._id} className="user-item">
                    <div className="user-info-container">
                      <label htmlFor="" className="user-label">NAME:</label>
                      <p className="user-info">{user.name}</p>
                    </div>
                    <div className="user-info-container">
                      <label htmlFor="" className="user-label">ID:</label>
                      <p className="user-info">{user._id}</p>
                    </div>
                    <div className="user-info-container">
                      <label htmlFor="" className="user-label">EMAIL:</label>
                      <p className="user-info">{user.email}</p>
                    </div>
                  </li>
                ))}
              </ul>
          </div>
       }

    </>
  );
};

export default App;