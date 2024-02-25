import React, { useState } from 'react'
import Logo from "../assets/banshee_logo.png";
import { Link } from "react-router-dom";
import '../styles/Navbar.css';


function Navbar() {

  const [showSidebar, setSidebar] = useState(false);

  const toggleNavbar = () => {
    setSidebar(!showSidebar);
  };

  return (
    <>
    <nav className='navbar'>
      <div className='navbar-container'>
        <ul className='sidebar' id={showSidebar ? "show" : "hide"}>
          <button className='nav-item' onClick={toggleNavbar}>
            <svg xmlns="http://www.w3.org/2000/svg" fill='white' height="38" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
          </button>
          <li className='nav-item' onClick={toggleNavbar}>
            <Link to='/' className='nav-links'>
              Home</Link>
          </li>
          <li className='nav-item' onClick={toggleNavbar}>
            <Link to='/dashboard' className='nav-links'>
              Dashboard</Link>
          </li>
          <li className='nav-item' onClick={toggleNavbar}>
            <Link to='/about' className='nav-links'>
              About</Link>
          </li>
          <li className='nav-item' onClick={toggleNavbar}>
            <Link to='/login' className='nav-links'>
              Logout</Link>
          </li>
        </ul>
        <ul className='navbarul'>
          <li className='nav-item-logo'>
            <Link to='/' className='nav-logo'>
              GCS<img src={ Logo } alt=''></img></Link>
          </li>
          <li className='hideOnMobile'>
            <Link to='/' className='nav-links'>
              Home</Link>
          </li>
          <li className='hideOnMobile'>
            <Link to='/dashboard' className='nav-links'>
              Dashboard</Link>
          </li>
          <li className='hideOnMobile'>
            <Link to='/about' className='nav-links'>
              About</Link>
          </li>
          <li className='hideOnMobile'>
            <Link to='/login' className='nav-links'>
              Logout</Link>
          </li>
          <button className='menu-icon' onClick={toggleNavbar}>
            <svg xmlns="http://www.w3.org/2000/svg" fill='white' height="24" viewBox="0 -960 960 960" width="24"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
          </button>
        </ul>
      </div>
    </nav>
    </>
  )
}

export default Navbar
