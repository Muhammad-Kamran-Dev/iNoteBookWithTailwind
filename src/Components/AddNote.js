import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import NoteContext from '../context/notes/NoteContext';

const AddNote = () => {
    const [note, setNote] = useState({ title: "", description: "", tags: "" });
    const context = useContext(NoteContext);
    const { addNotetoDatabase } = context;

    const onChangeHandler = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const addNote = (event) => {
        event.preventDefault(); // To prevent the default behaviour to load on submit when clicked on submit button 

        if (note.description.length < 5) return toast.warning("Description must be at least 5 characters");

        addNotetoDatabase(note.title, note.description, note.tags);  // Invoke the add to database function
        setNote({ title: "", description: "", tags: "" }); // Set the note to empty 
    }
    return (
        // Using form to get all the html5 builtIn features of validation
        <form onSubmit={addNote}>
            <h1 className='text-2xl font-bold my-10 text-center md:text-left'>Add new Note</h1>
            <div className="mb-6">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title </label>
                <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="title" onChange={onChangeHandler} value={note.title} placeholder="Enter Title " minLength="3" required />
            </div>
            <div className="mb-6">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Description</label>
                <textarea id="description" rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="description" onChange={onChangeHandler} value={note.description} placeholder="Enter Description" minLength="5" required></textarea>

            </div>
            <div className="mb-6">
                <label htmlFor="tags" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter tag </label>
                <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="tags" onChange={onChangeHandler} value={note.tags} placeholder="Enter Tag" />
            </div>

            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Note</button>
        </form>

    )
}

export default AddNote