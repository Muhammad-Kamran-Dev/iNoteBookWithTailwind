import React, { useEffect, } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import NoteContainer from './NoteContainer';
import Notes from './Notes';
import 'react-toastify/dist/ReactToastify.css';
const Home = () => {
  let location = useLocation();
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      document.title = location.pathname === "/" && "iNoteBook - Home";
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, [])

  return (
    localStorage.getItem('authToken') ?
      <div className=''>
        <NoteContainer />
        <Notes />
      </div> : ""
  )
}

export default Home