import React from 'react'
import '../styles/loginform.css';
import { FaUser, FaLock } from "react-icons/fa";
import background from '../assets/background.jpg';


const loginform = () => {
  return (
    <div className='page' style={{ backgroundImage: `url(${background})`}}>
        <div className='wrapper'>
            <form action="">
                {/*header for the login box */}
                <h1>Login</h1> 
                {/*a div for the username input */}
                <div className="input-box">
                    <input type="text" placeholder='Username' required />
                    {/*import user icon from web */}
                    <FaUser className='icon'/>
                </div>
                {/*a div for the password input */}
                <div className="input-box">
                    <input type="password" placeholder='Password' required />
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

export default loginform
