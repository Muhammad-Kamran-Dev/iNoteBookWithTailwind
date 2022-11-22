import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
const Notes = () => {
    const context = useContext(NoteContext);
    const { fetchAllNotes, notes, loading } = context;
    let location = useLocation();
    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            document.title = location.pathname === "/notes" && "iNoteBook - All Notes";
            fetchAllNotes();

        } else {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, [])

    return (
        // Load spinner until the loading of data complete
        localStorage.getItem('authToken') ?
            loading ? <Spinner /> :
                <>
                    <h1 className='custom-container text-2xl font-bold my-7 text-center md:text-left'>{notes.length > 0 ? "Your Notes Are" : "No Notes Found "}  </h1><div className='custom-container  my-10 grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3 xl:grid-cols-3 xl:gap-6 '>
                        {notes.length > 0 &&
                            notes.map((note => {
                                return <NoteItem key={note._id} value={note} />;
                            }))}
                    </div>
                </> : ""
    )
}

export default Notes