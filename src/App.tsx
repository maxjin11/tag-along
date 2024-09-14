import Home from './pages/Home';
import Login from './pages/Login';
import React from 'react';
import Navbar from './components/Navbar';
import TestPage from './pages/TestPage';
import './App.css';
import { BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;