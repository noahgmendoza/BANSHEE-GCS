import './styles/App.css';
import './styles/index.css';
import LoginForm from './pages/loginform';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/home" exact element={<Home/>} />
            <Route path="/dashboard" exact element={<Dashboard/>} />
            <Route path="/about" exact element={<About/>} />
            <Route path="/login" exact element={<LoginForm/>} />
          </Routes>
        </Router>
        
      </div>
    </div>
  );
}

export default App;
