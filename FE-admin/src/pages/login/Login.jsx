import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss';
import { BASE_URL } from '../../configs/app.config';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loginBody = {
    email,
    password,
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}/system/login`, loginBody);
      console.log('Login response:', response.data); // Check response data structure
      const { accessToken, refreshToken } = response.data; // Assuming response.data contains accessToken and refreshToken

      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);

      navigate('/home'); // Adjust the route as per your application
    } catch (error) {
      console.error('Error during login:', error.message);
      setError('Đăng nhập không thành công. Vui lòng thử lại.'); // Generic error message
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Đăng nhập</button>
      </div>
    </div>
  );
};

export default Login;
