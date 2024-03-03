import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/loginform.css';
import { FaUser, FaLock } from "react-icons/fa";
import background from '../assets/background.jpg';


const Loginform = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Hardcoded check for the username and password
        if (username === 'BANSHEEUAV' && password === 'bansheeuav2024') {
        onLogin();
        navigate('/'); // Redirect to the homepage after successful login
        } else {
        // Display an error message or handle unsuccessful login
        console.log('Invalid credentials');
        }
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
                <div className="remember-forgot">
                    <label><input type="checkbox" />Remember me</label>
                </div>
                {/*a button for the login button */}
                <button type="submit">Login</button>

                {/*a div for the text under login button */}
                <div className="gcs-text">
                    <p>GCS Member Login Only</p>
                </div>

            </form>
        </div>
    </div>
  )
}

export default Loginform
