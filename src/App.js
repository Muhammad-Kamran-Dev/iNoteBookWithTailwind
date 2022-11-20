import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Contact from './Components/Contact';
import About from './Components/About';
import NoPage from './Components/NoPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notes from './Components/Notes';
import NoteState from './context/notes/NoteState';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import AuthState from './context/auth/AuthState';
import { ToastContainer } from 'react-toastify';

function App() {
  return (

    <BrowserRouter>
      <NoteState>
        <AuthState>
          <Navbar title="iNoteBook" />
          <ToastContainer autoClose={1000} />
          <Routes>
            <Route exact path="/" element={[<Home key={"home"} />]} />
            <Route exact path="/notes" element={[<Notes key={"notes"} />]} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="*" element={<NoPage key="noPage" />} />
          </Routes>
        </AuthState>
      </NoteState>
    </BrowserRouter>

  );
}

export default App;
