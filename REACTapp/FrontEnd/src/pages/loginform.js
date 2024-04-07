import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/loginform.css';
import { FaUser, FaLock } from "react-icons/fa";
import background from '../assets/background.jpg';


const Loginform = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Function to handle login using Fetch API
    const loginUser = async (credentials) => {
        const loginUrl = 'https://rgs.bansheeuav.tech/api/users/login'; // Replace with your actual login endpoint URL

        // Fetch options
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        };

        try {
            const response = await fetch(loginUrl, fetchOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            // Handle successful login response
            console.log('Login successful:', data);
            // Assuming you receive a JWT token, you can store it in localStorage or sessionStorage for future requests
            const token = data.token;
            // store userid
            const userid = data.userid;

            localStorage.setItem('token', token);
            localStorage.setItem('userid', userid);
            onLogin();      // login
            navigate('/'); // Redirect to the homepage after successful login
        } catch (error) {
            // Handle error
            console.error('Error during login:', error.message);
            // Display error message to the user or handle unsuccessful login
            console.log('Invalid credentials');
        }

    };

    const handleLogin = (e) => {
        e.preventDefault();
        loginUser({ username, password });
    };

    const handleGuestLogin = () => {
        // Implement guest login functionality
        const guestCredentials = {
            username: 'guest',
            password: 'guest123'
        };
        loginUser(guestCredentials);
    };

  return (
    <div className='page' style={{ backgroundImage: `url(${background})`}}>
        <div className='wrapper'>
            <form onSubmit={handleLogin}>
                {/*header for the login box */}
                <h1>Login</h1> 
                {/*a div for the username input */}
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    {/*import user icon from web */}
                    <FaUser className='icon'/>
                </div>
                {/*a div for the password input */}
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <FaLock className='icon'/>
                </div>
                {/*a div for the remember me checkbox */}
                {/* <div className="remember-forgot">
                    <label><input type="checkbox" />Remember me</label>
                </div> */}
                {/*a button for the login button */}
                <button type="submit">Login</button>

                {/*a div for the text under login button */}
                <div className="gcs-text">
                    <p>GCS Member Login Only</p>
                </div>

                <div className='guest-text' onClick={handleGuestLogin}>
                    <p>Guest Login</p>
                </div>

            </form>
        </div>
    </div>
  )
}

export default Loginform
