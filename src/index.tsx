import * as React from 'react';
import { createRoot } from "react-dom/client"
import 'simplebar/dist/simplebar.min.css';
import "nprogress/nprogress.css";
import 'material-react-toastify/dist/ReactToastify.css';
import {  RouterProvider } from 'react-router-dom';
import router from 'router';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.Fragment>
    <RouterProvider router={router} />
  </React.Fragment>
);
