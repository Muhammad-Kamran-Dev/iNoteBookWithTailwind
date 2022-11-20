import React, { useContext, useRef } from 'react'
import { toast } from 'react-toastify';
import NoteContext from '../context/notes/NoteContext';
const NoteItem = (props) => {
  // const [updatedNote, setUpdatedNote] = useState({ id: "", etitle: "", edescription: "", etags: "" })

  const context = useContext(NoteContext);
  const { deleteNote, updateNoteDatabase, setUpdatedNote, updatedNote } = context;
  const { title, description, tags, _id } = props.value;

  const openModal = useRef(null);
  const closeModal = useRef(null);

  const onChangeHandler = (event) => {
    setUpdatedNote({ ...updatedNote, [event.target.name]: event.target.value });
  }
  // SetUpdatedNote when user is updating note   
  const setUpdateNote = (currentNote) => {
    setUpdatedNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etags: currentNote.tags,
    }); // Update the state of the note which is defined in the noteState beacause of setUpdatedNote is not updating state immediately 
    openModal.current.click(); // To click on the modal show button
  }
  const handleUpdateSubmit = (event) => {
    // Craete a newNote from the Existing note
    event.preventDefault();

    // Check if the note description is less then 5 characters then return with a toast
    if (updatedNote.edescription.length < 5) return toast.warning("Description must be at least 5 characters");

    updateNoteDatabase(updatedNote.id, updatedNote.etitle, updatedNote.edescription, updatedNote.etags); // Update in the database
    setUpdatedNote({
      id: "",
      etitle: "",
      edescription: "",
      etags: "",
    });
    closeModal.current.click();
  }
  return (
    <>
      {/* // <!-- Button trigger modal --> */}
      <button type="button" className='hidden'
        data-bs-toggle="modal" data-bs-target="#staticBackdrop" ref={openModal}>
      </button>
      {/* Update Note Modal */}
      <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog relative w-auto pointer-events-none">
          <div
            className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div
              className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">

              {/* Modal Title */}
              <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">
                Update Note
              </h5>

              {/* X Button to close Modal */}
              <button type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleUpdateSubmit}>
              {/* Modal input fields  */}
              <div className="modal-body relative p-4">
                <div className="mb-6">
                  <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title </label>
                  <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="etitle" onChange={onChangeHandler} value={updatedNote.etitle} placeholder="Enter Title " minLength="3" required />
                </div>
                <div className="mb-6">
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Description</label>
                  <textarea id="description" rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="edescription" onChange={onChangeHandler} value={updatedNote.edescription} placeholder="Enter Description" minLength="5" required></textarea>

                </div>
                <div className="mb-6">
                  <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tag </label>
                  <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="etags" onChange={onChangeHandler} value={updatedNote.etags} placeholder="Enter Tag " />
                </div>
              </div>
              {/* Update Modal Button */}
              <div
                className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">

                {/* Close Modal Button */}
                <button type="button"
                  className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                  data-bs-dismiss="modal" ref={closeModal}>Close</button>

                {/* Upodate Modal Button */}
                <button type="submit"
                  className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1" >Update Note</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Note Item */}
      <div className='border-2 border-[#9F9AE7] rounded-lg py-3 px-5'>
        <h1 className='font-bold mb-5'>{title}</h1>
        <p className='mb-5'>{description}</p>
        <p>{tags}</p>
        <div className="icons flex gap-3 mt-5 mb-2">
          <i className="fa-solid fa-trash-can fa-lg" onClick={() => { deleteNote(_id) }}></i>
          <i className="fa-solid fa-pen-to-square fa-lg" onClick={() => {
            setUpdateNote(props.value);
          }}></i>
        </div>
      </div>
    </>
  )
}

export default NoteItem