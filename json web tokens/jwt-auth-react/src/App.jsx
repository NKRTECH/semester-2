import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [profile, setProfile] = useState(null);
  const [refreshMessage, setRefreshMessage] = useState('');
  const [clickrefresh, setClickrefresh] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies(['token']); // Add 'token' cookie
  const cookietoken = cookies.token || '';

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error:', error.response.data.message);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token]);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      setCookie('token', response.data.token, { path: '/' }); // Set token in cookie
      setToken(response.data.token);
    } catch (error) {
      console.error('Error:', error.response.data.message);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/register', { username, password });
      console.log('User registered successfully');
    } catch (error) {
      console.error('Error:', error.response.data.message);
    }
  };

  const handleLogout = () => {
    removeCookie('token')
    setToken('');
    setProfile(null);
    setRefreshMessage('');
  };

  const handleRefreshToken = async () => {
    try {
      const response = await axios.post('http://localhost:5000/refresh-token', { refreshToken: token });
      setClickrefresh(clickrefresh + 1)
      setToken(response.data.token);
      setCookie('token', response.data.token, { path: '/' });
      setRefreshMessage('Token refreshed successfully!');
    } catch (error) {
      console.error('Error refreshing token:', error.response.data.message);
    }
  };

  const clearcookie = () => {
    removeCookie('token')
  }

  return (
    <div>
      <h1>JWT Authentication Example</h1>
      <h3>{cookietoken && 'below is token from cookie'}</h3>
      <h4> {cookietoken}</h4>
      <button onClick={clearcookie}>{cookietoken ? 'clear cookie' : null}</button>
      {!token ? (
        <div>
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegister}>Register</button>
        </div>
      ) : (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleRefreshToken}>Refresh Token</button>
          <p>{token}</p>
          <p>{refreshMessage && refreshMessage}  {refreshMessage &&  `refreshed ${clickrefresh} times`} </p>
          {profile && (
            <div>
              <h2>Profile</h2>
              <p>Username: {profile.username}</p>
              <p>User ID: {profile.userId}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default App;