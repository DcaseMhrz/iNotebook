import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AlertState from "./context/alert/AlertState";
import Alert from './components/Alert'



function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <AlertState>
        <Alert />
        
        <div className="container">
          <NoteState>
            <Routes>

              <Route path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/login" element={<Login />} />
            </Routes>
          </NoteState>
        </div>
        </AlertState>
      </BrowserRouter>


    </>
  );
}

export default App;
