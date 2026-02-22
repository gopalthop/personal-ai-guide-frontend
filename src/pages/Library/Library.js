import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Library.css";

function Library() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await axios.get("https://personal-ai-guide-backend.onrender.com/api/notes");
    setNotes(res.data.notes);
  };

  const deleteNote = async (id) => {
    await axios.delete(`https://personal-ai-guide-backend.onrender.com/api/notes/${id}`);
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="libraryPage">
      <h1>Knowledge Library</h1>

      {notes.map((note) => (
        <div key={note._id} className="noteCard">
          <p>{note.text}</p>
          <button onClick={() => deleteNote(note._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Library;
