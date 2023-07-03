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
import { Explore } from "./frontend/pages/Explore/Explore";
import { Signup } from "./frontend/pages/Signup/Signup";
import { LoginContextProvider } from "./frontend/contexts/LoginContext/loginContext";
import { FeedContextProvider } from "./frontend/contexts/FeedContext/feedContext";
import { Welcome } from "./frontend/pages/Welcome/Welcome";

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
