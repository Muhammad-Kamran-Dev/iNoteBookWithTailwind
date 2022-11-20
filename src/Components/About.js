import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
const About = () => {
  let location = useLocation();
  useEffect(() => {
    document.title = location.pathname === "/about" && "iNoteBook - About";
    // eslint-disable-next-line
  }, [])

  return (
    <div className='custom-container'>About</div>
  )
}

export default About