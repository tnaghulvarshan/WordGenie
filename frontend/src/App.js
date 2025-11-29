import React from "react";
import Navbar from "./components/navbar/index";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from "./components/home/index";
import Login from "./components/logs/login";
import Signup from "./components/logs/signup";
import "./index.css";

function App() {
  return (
    <div>
    
      <Router>
          <Navbar />
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
        </Routes>
      </Router>
    
    </div>
  );
}

export default App;
