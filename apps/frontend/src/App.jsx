// apps/frontend/src/App.
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, Footer } from './app/components/common';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element="Home" />
        <Route path="/about" element="About"/>
        {/* Add other routes as needed */}
      </Routes>
      </div>
  );
}

export default App;