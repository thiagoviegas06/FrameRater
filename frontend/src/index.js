import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { OverlayProvider } from './context/OverlayProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <OverlayProvider>
            <App />
        </OverlayProvider>
    </React.StrictMode>
);

reportWebVitals();
