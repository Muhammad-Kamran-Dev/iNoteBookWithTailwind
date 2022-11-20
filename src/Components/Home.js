import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import NoteContainer from './NoteContainer';
import Notes from './Notes';
import 'react-toastify/dist/ReactToastify.css';
const Home = () => {
  let location = useLocation();
  useEffect(() => {
    document.title = location.pathname === "/" && "iNoteBook - Home";
    // eslint-disable-next-line
  }, [])

  return (
    <div className=''>
      <NoteContainer />
      <Notes />
    </div>
  )
}

export default Home