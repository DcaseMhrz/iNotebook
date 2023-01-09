import React from "react";
import NoteContext from "../context/notes/NoteContext";
import { useContext, useState } from "react";
import AlertContext from "../context/alert/AlertContext";

const AddNote = () => {
    const {showAlert}=useContext(AlertContext)
    const context = useContext(NoteContext);
    const { addNote, fetchNotes } = context;
    const initialNote = { title: "", description: "", tag: "" };

    const [note, setNote] = useState(initialNote);

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        fetchNotes();
        setNote({title: "", description: "", tag: "" })
       showAlert("success","Added")
    };
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <form>
                <h2 className="my-3 ">Add a note</h2>
                <div className="row">
                    <div className="col col-4">
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Title
                            </label>
                            <input
                                type="text"
                                className="form-control "
                                id="title"
                                aria-describedby="title"
                                name="title"
                                onChange={onChange}
                                value={note.title}
                            />
                        </div>
                    </div>
                    <div className="col col-8">
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label ">
                                Description
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                onChange={onChange}
                                rows="3"
                                value={note.description}
                            />
                        </div>

                    </div>
                    
                </div>
                <button
                        type="submit"
                        className="btn btn-primary flex-end"
                        onClick={handleClick}
                        disabled={note.title.length<5 || note.description.length<5}
                    >
                        Add Note
                    </button>
            </form>
            
        </div>
    );
};

export default AddNote;
