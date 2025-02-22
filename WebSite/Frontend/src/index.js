import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import './index.css';
import App from './App';

const container = document.getElementById('root');

const root = createRoot(container);

root.render(
  <Router> {/* Wrap your entire app with BrowserRouter */}
    <App />
  </Router>
);
