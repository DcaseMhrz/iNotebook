import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesInitial=[]
  const HOST = "http://localhost:5000";
  const [notes, setnotes] = useState(notesInitial);

  //Fetch all notes
  const fetchNotes = async () => {
    //API call

    const response = await fetch(`${HOST}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiNjcwNTE0MGQzYmE2M2Q4MGNjYjMwIn0sImlhdCI6MTY3MjkwMTc3Nn0.QSKxRGQ4OtH8hUL74s0V2SzBUFcOHL9_QnLt4UhP4gc",
      },
    });
    const data = await response.json();
    console.log(data);
    setnotes(data)
  };

  //Add a note
  const addNote = async(title, description, tag) => {
    //API call

    const body={
        
      "title":title,
      "description":description,
      "tag":tag
    
  }
    const response = await fetch(`${HOST}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiNjcwNTE0MGQzYmE2M2Q4MGNjYjMwIn0sImlhdCI6MTY3MjkwMTc3Nn0.QSKxRGQ4OtH8hUL74s0V2SzBUFcOHL9_QnLt4UhP4gc",
      },
      body:JSON.stringify(body)
      
    });
      const data = await response.json()
      console.log(data);
      // setnotes(notes.concat(notes))
  }
    
  

  //Delete a note
  const deleteNote = async (id) => {
    //API call

    const response = await fetch(`${HOST}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiNjcwNTE0MGQzYmE2M2Q4MGNjYjMwIn0sImlhdCI6MTY3MjkwMTc3Nn0.QSKxRGQ4OtH8hUL74s0V2SzBUFcOHL9_QnLt4UhP4gc",
      },
    });
    const data = await response.json();
    console.log(data);
    fetchNotes() 
  };


  // Edit a note
  const editNote = async ({id,title,description,tag}) => {
    console.log(id)
    const data={
      "title":title,
      "description":description,
      "tag":tag
    }
    //API call

    const response = await fetch(`${HOST}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiNjcwNTE0MGQzYmE2M2Q4MGNjYjMwIn0sImlhdCI6MTY3MjkwMTc3Nn0.QSKxRGQ4OtH8hUL74s0V2SzBUFcOHL9_QnLt4UhP4gc",
    },
           body: JSON.stringify(data)
    });
    const final = await response.json();
    console.log(final)
    fetchNotes()
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,fetchNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
