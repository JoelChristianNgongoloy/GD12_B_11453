import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './routes/index.jsx';
import "bootstrap/dist/css/bootstrap.min.css"; // Mengimport bootstrap


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
)
