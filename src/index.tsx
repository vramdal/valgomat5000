import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from "./App";
import Root from "./routes/root";
import Alder from "./routes/alder";
import ForrigeValg from "./routes/forrige-valg";
import Fornoyd from "./routes/fornoyd";
import MestEnig from "./routes/mest-enig";
import Konklusjon from "./routes/konklusjon";
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import { State } from "./types";
import '@picocss/pico/css/pico.min.css';
import Kommune from "./routes/kommune";

export type RouteWithRequirement =
  RouteObject
  & { path: string, skipIf?: (values: State) => boolean };
export const routes: Array<RouteWithRequirement> = [
  {
    path: "/",
    element: <Root/>,
  },
  {
    path: "/alder",
    element: <Alder/>,
  },
  {
    path: "/kommune",
    element: <Kommune/>,
  },
  {
    path: "/2019",
    element: <ForrigeValg/>,
  },
  {
    path: "/fornoyd",
    element: <Fornoyd/>,
    skipIf: (values: State) => values.forrigeValg === "Stemte ikke ved forrige valg",
  },
  {
    path: "/2023",
    element: <MestEnig/>,
    skipIf: (values: State) => values.fornoyd === "Ja",
  },
  {
    path: "/konklusjon",
    element: <Konklusjon/>,
  }
];

const router = createBrowserRouter(routes, {basename: "/valgomat5000"});


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App>
      <RouterProvider router={router}/>
    </App>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
