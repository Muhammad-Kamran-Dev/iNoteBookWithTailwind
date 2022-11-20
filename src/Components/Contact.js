import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const Contact = () => {
  let location = useLocation();
  useEffect(() => {
    document.title = location.pathname === "/contact" &&  "iNoteBook - Contact";
    // eslint-disable-next-line
  }, [])

  return (
    <div className='custom-container '>Contact</div>
  )
}

export default Contact