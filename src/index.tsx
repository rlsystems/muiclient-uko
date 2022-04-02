import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.min.css';
import 'simplebar/dist/simplebar.min.css';
import "nprogress/nprogress.css";

import App from './App';
import {createBrowserHistory} from 'history';
import { Router } from 'react-router-dom';


export const history = createBrowserHistory();



ReactDOM.render(

    <Router history={history}>
      <App />
    </Router>

,
  document.querySelector('#root'),
);
