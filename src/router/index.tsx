import App from "App";
import {  Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import routes, { renderRoutes } from "routes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {renderRoutes(routes)}
    </Route>
  )
);

export default router