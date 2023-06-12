import { Outlet } from "react-router-dom";
import "./App.css";
import { Nav } from "./frontend/components/Nav/Nav";
import { FeedContextProvider } from "./frontend/contexts/FeedContext/feedContext";

function App() {
  return (
    <div className="App">
      <FeedContextProvider>
        <Nav />
        <Outlet />
      </FeedContextProvider>
    </div>
  );
}

export default App;
