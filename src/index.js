import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./frontend/pages/Home/Home";
import { makeServer } from "./server";
import { Mockbee } from "./frontend/pages/Mockbee/Mockbee";
import { Login } from "./frontend/pages/Login/Login";
import { Auth } from "./frontend/Auth/Auth";
import { Bookmarks } from "./frontend/pages/Bookmarks/Bookmarks";
import { Profile } from "./frontend/pages/Profile/Profile";

// Call make Server
makeServer();
const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Auth>
            <Home />
          </Auth>
        ),
      },
      { path: "/login", element: <Login /> },
      {
        path: "/bookmarks",
        element: (
          <Auth>
            <Bookmarks />
          </Auth>
        ),
      },
      {
        path: "/profile",
        element: (
          <Auth>
            <Profile />
          </Auth>
        ),
      },
    ],
  },
  {
    path: "/mockman",
    element: <Mockbee />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
