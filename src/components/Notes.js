import React from "react";
import { useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import NotesItem from "./NotesItem";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, fetchNotes} = context;
useEffect(() => {
  fetchNotes();
},[])

  return (
    <>
      <AddNote />
      <div className="container">
        <h2 className="my-3 text-center">Your Notes</h2>
        <div className="row justify-content-center">
          {notes.map((note) => {
            return <NotesItem note={note} key={note._id} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
