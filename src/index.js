import React from 'react';
import ReactDOM from 'react-dom';
import './axios';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Router from './Router'

import NavBar from './components/app/NavBar'

ReactDOM.render(
  <React.StrictMode>
    <NavBar />
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
