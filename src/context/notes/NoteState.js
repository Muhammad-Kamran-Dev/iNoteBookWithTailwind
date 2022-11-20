import { useState } from "react";
import NoteContext from "./NoteContext";
import { toast } from 'react-toastify';
const NoteState = (props) => {
    const host = "http://localhost:5000";

    const initialNotes = [];
    const [notes, setNote] = useState(initialNotes);
    const [loading, setLoading] = useState(true);
    const [updatedNote, setUpdatedNote] = useState({ id: "", etitle: "", edescription: "", etags: "" })

    // Fetch all notes  
    const fetchAllNotes = async () => {
        // API Call to fetch all notes of the user based on the auth-token of the login user 
        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: 'GET', // Method to get data
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3NjcwNTA4MzgzNTM2ODRkYTJmN2Q2In0sImlhdCI6MTY2ODcwNzY3NX0.-v4zXZxsWdYZ0YqEn9nJ5ROH4KaVHp67Jj3StWJ4jAU"
                }
            });

            if (response.status !== 200) return toast.warning("Fetching notes Unsuccessful ");
            // Wait for data 
            const data = await response.json();

            setNote(data.notes); // Set note to the new loaded notes array for the login user 
            setLoading(false); // Make loading false to show all the notes on page 
        } catch (error) {
            toast.warning(error.message);
        }
    }

    // AddNote 
    const addNotetoDatabase = async (title, description, tag) => {
        // API Call
        try {
            const validTag = tag === "" ? "General" : tag;
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3NjcwNTA4MzgzNTM2ODRkYTJmN2Q2In0sImlhdCI6MTY2ODcwNzY3NX0.-v4zXZxsWdYZ0YqEn9nJ5ROH4KaVHp67Jj3StWJ4jAU"
                }, body: JSON.stringify({ title, description, tag: validTag })

            });
            const data = await response.json();
            if (response.status !== 200) return toast.warning(data.error, data);
            setNote(notes.concat(data.note)); // Concat new added note to the previouse fetched notes on the frontend 
            toast("✅ Note Added Successfully"); // Show  a Toast message after adding note
        } catch (error) {
            toast.warning(error.message);
        }
    }

    // Delete Note
    const deleteNote = async (noteId) => {
        // API Call
        try {
            const response = await fetch(`${host}/api/notes/deletenote/${noteId}`, {
                method: 'Delete', // Method to delete note 
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3NjcwNTA4MzgzNTM2ODRkYTJmN2Q2In0sImlhdCI6MTY2ODcwNzY3NX0.-v4zXZxsWdYZ0YqEn9nJ5ROH4KaVHp67Jj3StWJ4jAU"
                }
            });
            if (response.status !== 200) return toast.warning("Note has not been Deleted ");
            setNote(notes.filter(note => note._id !== noteId)); // filter and don't add the note with (noteId) on the frontend
            toast.warning("Note has been Deleted"); //Toast message after deleting the note
        } catch (error) {
            toast.warning(error.message);
        }
    }

    // Update Note
    const updateNoteDatabase = async (noteId, title, description, tags) => {
        // API Call
        try {
            const response = await fetch(`${host}/api/notes/updatenote/${noteId}`, {
                method: 'PUT', // Method to UPDATE note 
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3NjcwNTA4MzgzNTM2ODRkYTJmN2Q2In0sImlhdCI6MTY2ODcwNzY3NX0.-v4zXZxsWdYZ0YqEn9nJ5ROH4KaVHp67Jj3StWJ4jAU"
                }, body: JSON.stringify({ title, description, tag: tags })
            });

            if (response.status !== 200) return toast.warning("Note Updation Unsuccessful");

            // Because setNote is not updating the notes immediately so we need to make a deep copy of the notes and then update the note in that copy and then set the updated note to the original note 
            const editedNote = JSON.parse(JSON.stringify(notes)); // Creating deep copy of the notes to ensure that update immediately
            // Find Note to be Updated and update on frontend
            editedNote.forEach(note => {
                if (note._id === noteId) {
                    note.title = title;
                    note.description = description;
                    note.tag = tags;
                    return;
                }
            })
            setNote(editedNote);
            toast.success("Note has been Updated"); //Toast message after updating the note 
        } catch (error) {
            toast.warning(error.message);
        }
    }
    return (
        <NoteContext.Provider value={{ notes, fetchAllNotes, setNote, addNotetoDatabase, deleteNote, loading, updateNoteDatabase, setUpdatedNote, updatedNote }}>
            {props.children}
        </NoteContext.Provider>
    )

}
export default NoteState;