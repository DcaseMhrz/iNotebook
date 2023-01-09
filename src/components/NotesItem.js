import React, { useContext } from "react";
import AlertContext from "../context/alert/AlertContext";
import NoteContext from "../context/notes/NoteContext";

const NotesItem = (props) => {
  const {showAlert}=useContext(AlertContext)
  const context = useContext(NoteContext)
  const { deleteNote } = context;
  

  const { note,updateNote } = props;
  return (
    <>
      <div className="card col-md-3 mx-1  my-2">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="fa-solid fa-trash mx-3" onClick={() => {
            deleteNote(note._id)
            showAlert("success","Deleted Note")
          }}></i>
          <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>{updateNote(note)}}></i>
        </div>
      </div>

      
      
    </>
  );
};

export default NotesItem;
