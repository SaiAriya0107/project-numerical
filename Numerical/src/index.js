import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter baseUrl={'/'}>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

