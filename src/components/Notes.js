import React from "react";
import { useContext, useState, useEffect, useRef } from "react";
import NoteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import NotesItem from "./NotesItem";
import AlertContext from "../context/alert/AlertContext";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const navigate=useNavigate();
  const {showAlert}=useContext(AlertContext)
  const context = useContext(NoteContext);
  const { notes, fetchNotes, editNote } = context;

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    tag: "",
  });
  useEffect(() => {
    if(localStorage.getItem("token")){
      fetchNotes();
    }
    else{
      navigate("/login")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      tag: "default",
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    editNote({
      id: note.id,
      title: note.etitle,
      description: note.edescription,
      tag: note.tag,
    });
    showAlert("success","Saved")
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const ref = useRef(null);
  return (
    <>
      <AddNote />
      <div className="container">
        <h2 className="my-3 text-center">Your Notes</h2>
        <div className="row justify-content-center">
          {notes.length===0 && 'No notes to display'}
          {notes.length!==0 && notes.map((note) => {
            return (
              <NotesItem note={note} key={note._id} updateNote={updateNote} />
            );
          })}
        </div>
      </div>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit{" "}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col col-4">
                    <div className="mb-3">
                      <label htmlFor="etitle" className="form-label">
                        Title
                      </label>
                      <input
                        type="text"
                        className="form-control "
                        id="etitle"
                        aria-describedby="etitle"
                        name="etitle"
                        value={note.etitle}
                        onChange={onChange}
                        
                      />
                    </div>
                  </div>
                  <div className="col col-8">
                    <div className="mb-3">
                      <label htmlFor="edescription" className="form-label ">
                        Description
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="edescription"
                        name="edescription"
                        value={note.edescription}
                        onChange={onChange}
                        rows="3"
                        
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleClick}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    disabled={note.etitle.length<5 || note.edescription.length<5}
                  >
                    Save Note
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Notes;
