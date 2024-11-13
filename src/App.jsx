import { BrowserRouter as Router, Route, Routes ,Navigate} from "react-router-dom";
import './App.css'
import Leaderboard from './Pages/Leaderboard'
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import React, { useEffect, useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); 
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <>
        <Router>
        <Routes>
        
          <Route path="/" element={isAuthenticated ? <Navigate to="/leaderboard" /> : <Navigate to="/login" />} />

         
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

        
          <Route path="/register" element={<Register />} />

        
          <Route path="/leaderboard" element={isAuthenticated ? <Leaderboard /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
