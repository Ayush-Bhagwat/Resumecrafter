import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Builder from "./components/Builder";


const App = () => {
  return (
    <Router>
      <div className="bg-zinc-900 min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/builder" element={<Builder />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
