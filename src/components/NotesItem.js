import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const NotesItem = (props) => {
  const context = useContext(NoteContext)
  const { deleteNote } = context;

  const { note } = props;
  return (
    <>
      <div className="card col-md-3 mx-1  my-2">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="fa-solid fa-trash mx-3" onClick={() => {
            deleteNote(note._id)
          }}></i>
          <i className="fa-solid fa-pen-to-square mx-3" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
        </div>
      </div>

      
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Edit {note.title}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            {note.title}{note.description}{note._id}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotesItem;
