import { Outlet } from "react-router-dom";
import "./App.css";
import { Nav, PageNav } from "./frontend/components/index";
import { ScrollRestoration } from "react-router-dom";
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
