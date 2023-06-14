import { Outlet } from "react-router-dom";
import "./App.css";
import { Nav } from "./frontend/components/Nav/Nav";
import { FeedContextProvider } from "./frontend/contexts/FeedContext/feedContext";
import { LoginContextProvider } from "./frontend/contexts/LoginContext/loginContext";
import { PageNav } from "./frontend/components/PageNav/PageNav";

function App() {
  return (
    <div className="App">
      <LoginContextProvider>
        <FeedContextProvider>
          <Nav />
          <Outlet />
          <PageNav />
        </FeedContextProvider>
      </LoginContextProvider>
    </div>
  );
}

export default App;
