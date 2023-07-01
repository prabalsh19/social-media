import { Outlet } from "react-router-dom";
import "./App.css";
import { Nav } from "./frontend/components/Nav/Nav";
import { PageNav } from "./frontend/components/PageNav/PageNav";

function App() {
  return (
    <div className="App">
      <Nav />
      <main className="main">
        <PageNav />
        <Outlet />
      </main>
    </div>
  );
}

export default App;
