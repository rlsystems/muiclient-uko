import * as React from 'react';
import { createRoot } from "react-dom/client"
import {createBrowserHistory} from 'history';
import 'simplebar/dist/simplebar.min.css';
import "nprogress/nprogress.css";
import 'material-react-toastify/dist/ReactToastify.css';
import App from './App';
import { Router } from 'react-router-dom';
import ScrollToTop from 'app/utils/ScrollToTop';

export const history = createBrowserHistory();
const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <Router history={history}>
      <ScrollToTop/>
      <App />
  </Router>
);
