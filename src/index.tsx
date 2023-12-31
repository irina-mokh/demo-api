import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'app';

const root = ReactDOM.createRoot(
  // eslint-disable-next-line prettier/prettier
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

