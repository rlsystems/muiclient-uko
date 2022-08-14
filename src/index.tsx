import * as React from 'react';
import ReactDOM from 'react-dom';
import 'simplebar/dist/simplebar.min.css';
import "nprogress/nprogress.css";
import 'material-react-toastify/dist/ReactToastify.css';
import App from './App';
import {createBrowserHistory} from 'history';
import { Router } from 'react-router-dom';
import ScrollToTop from 'app/utils/ScrollToTop';

export const history = createBrowserHistory();

ReactDOM.render(
    <Router history={history}>
      <ScrollToTop/>
      <App />
    </Router>
,
  document.querySelector('#root'),
);
