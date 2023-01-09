import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const NotesItem = (props) => {
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
          }}></i>
          <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>{updateNote(note)}}></i>
        </div>
      </div>

      
      
    </>
  );
};

export default NotesItem;
