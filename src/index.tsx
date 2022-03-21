import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.min.css';

import App from './app/layout/App';
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
