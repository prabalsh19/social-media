import { Outlet, ScrollRestoration } from "react-router-dom";
import { Nav, PageNav } from "./frontend/components/index";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ScrollRestoration />
      <Nav />
      <main className="main">
        <PageNav />
        <Outlet />
      </main>
    </div>
  );
}

export default App;
