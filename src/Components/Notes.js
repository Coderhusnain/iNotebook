import React, { useContext, useEffect, useRef,useState } from "react";
import noteContext from "../context/notes/NotesContext";
import { useNavigate } from 'react-router-dom';

import NoteItem from "./NoteItem";
import Addnote from "./Addnote";
const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes,editNote } = context;
  let navigate = useNavigate();

  

  useEffect(() => {
    if (localStorage.getItem('token')){
      getNotes();
      console.log("token",localStorage.getItem('token'))

    }
    else{
      navigate('/login');
    }
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);

  
  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  };
  const handleClick=(e)=>{
    e.preventDefault();
    refClose.current.click();
    editNote(note.id,note.etitle,note.edescription,note.etag)
    props.showAlert("Note Updated","success")
}

const onchange=(e)=>{
setNote({...note,[e.target.name]:e.target.value})

}
  
  return (
    <>
      <Addnote showAlert={props.showAlert}/>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
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
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form action="">
                <div className="form-group">
                  <label htmlFor="etitle">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onchange}
                  />
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="edescription">Description</label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onchange}
                    rows={4}
                  />
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="etag">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onchange}
                    rows={4}
                  />
                </div>
                <br />

                
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button type="button" onClick={handleClick} className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {notes.length===0 && "No notes to display"}
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert}  note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
