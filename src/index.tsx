import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RootLayout from './components/layout/RootLayout';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RootLayout />
  </React.StrictMode>
);
