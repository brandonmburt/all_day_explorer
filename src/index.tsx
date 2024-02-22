import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.scss';
// import reportWebVitals from './reportWebVitals';
import './config/config';
import Providers from './providers/Providers.comp';
import { NavBar } from './components/NavBar';
import { NavRoutes } from './components/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { Footer } from './components/Footer';

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
