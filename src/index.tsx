import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import reportWebVitals from './reportWebVitals';
import './config/config';
import Providers from './providers/Providers.comp';
import { NavBar } from './components/NavBar.comp';
import { NavRoutes } from './components/Routes.comp';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { Footer } from './components/Footer.comp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Providers>
        <div id='content'>
            <NavBar />
            <NavRoutes />
        </div>
        <Footer />
    </Providers>
  </React.StrictMode>
);

// Uncomment to start measuring application performance 
// reportWebVitals(console.log);
