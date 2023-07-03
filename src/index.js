import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  Mockbee,
  Login,
  Bookmarks,
  Profile,
  Explore,
  Signup,
  Welcome,
} from "./frontend/pages/index";
import { Auth } from "./frontend/Auth/Auth";
import { makeServer } from "./server";
import {
  LoginContextProvider,
  FeedContextProvider,
} from "./frontend/contexts/index";

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

      {
        path: "/bookmarks",
        element: (
          <Auth>
            <Bookmarks />
          </Auth>
        ),
      },
      {
        path: "/profile/:username",
        element: (
          <Auth>
            <Profile />
          </Auth>
        ),
      },
      {
        path: "/explore",
        element: (
          <Auth>
            <Explore />
          </Auth>
        ),
      },
    ],
  },
  {
    path: "/mockman",
    element: <Mockbee />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  { path: "/getting-started", element: <Welcome /> },
]);

root.render(
  <React.StrictMode>
    <LoginContextProvider>
      <FeedContextProvider>
        <RouterProvider router={router} />
      </FeedContextProvider>
    </LoginContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
