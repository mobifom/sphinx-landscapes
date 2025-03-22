// apps/frontend/src/app/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar, Footer } from './app/components/common';
import AppRoutes from './app/routes';
import { AppProvider } from './app/context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow pt-16">
            <AppRoutes />
          </div>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;