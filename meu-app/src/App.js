import "./App.css";
import Endereco from "./Endereco";
import NavigationBar from "./Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Github from "./Github";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route exact path="/" element={<Endereco />} />
        <Route path="/github" element={<Github />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
