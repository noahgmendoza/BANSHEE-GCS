import React, { useState } from 'react';
import './styles/App.css';
import './styles/index.css';
import LoginForm from './pages/loginform';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Navbar from "./components/Navbar";
import VideoFeed from "./pages/VideoFeed";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Add your login logic here
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Add your logout logic here
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <div>
        <Router>
          <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={
                isLoggedIn ? <Dashboard /> : <Navigate to="/login" />
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/login"
              element={<LoginForm onLogin={handleLogin} />}
            />
            <Route 
              path="/livevideofeed" 
              element={
                isLoggedIn ? <VideoFeed /> : <Navigate to="/login" />
              } 
            />
          </Routes>
        </Router>
        
      </div>
    </div>
  );
}

export default App;
