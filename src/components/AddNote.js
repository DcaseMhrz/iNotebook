import React from "react";
import NoteContext from "../context/notes/NoteContext";
import { useContext, useState } from "react";

const AddNote = () => {
    const context = useContext(NoteContext);
    const { addNote, fetchNotes } = context;
    const initialNote = { title: "", description: "", tag: "" };

    const [note, setnote] = useState(initialNote);

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        fetchNotes();
        // setnote(initialNote+"a")
    };
    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h2 className="my-3 ">Add a note</h2>
            <div class="row">
                <div class="col col-4">
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
                        />
                    </div>
                </div>
                <div class="col col-8">
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
                        />
                    </div>
                    
                </div>
                <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleClick}
                    >
                        Add Note
                    </button>
            </div>
            <form></form>
        </div>
    );
};

export default AddNote;
