import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import FlightContextProvider from './context/FlightProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FlightContextProvider>
    <App />
  </FlightContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
