import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";

function App() {
  return (
    <>
      <NoteState>
        
        
          <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>

              <Route path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
            </Routes>
            </div>
          </BrowserRouter>
        
      </NoteState>
    </>
  );
}

export default App;
