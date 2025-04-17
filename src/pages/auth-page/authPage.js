import React, { useState, useContext } from 'react';
import './authPageStyle.css';
import { loginUser, registerUser } from '../../api/authAPI';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ username: '', email: '', password: '' });
    setError('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        // Login functionality
        const res = await loginUser({ email: formData.email, password: formData.password });
        console.log('✅ Login API response:', res); // Log the full API response for debugging
  
        if (res && res.token && res.userId && res.username) {
          login(res); // Pass the entire response object
          console.log('✅ After login(), about to navigate'); 
          navigate('/'); // Navigate to home page after login
        } else {
          console.error('Login response data is missing');
          setError('Invalid login credentials. Please try again.');
        }
      } else {
        // Registration functionality
        await registerUser(formData);
        toggleForm(); // Switch to login form after successful signup
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Error during submit:', err); // Log the error for debugging
    }
  };
  
  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        {!isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        {error && <p className="error">{error}</p>}
      </form>
      <p className="toggle-text">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <span className="toggle-link" onClick={toggleForm}>
          {isLogin ? 'Register here' : 'Login here'}
        </span>
      </p>
    </div>
  );
};

export default AuthPage;
