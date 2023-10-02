import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NotesContext"
const Addnote = (props) => {
    const context=useContext(noteContext);
    const {addNote}=context
    const [note,setNote]=useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
            e.preventDefault();
            addNote(note.title,note.description,note.tag)
            props.showAlert("Note Added","success")
            setNote({title:"",description:"",tag:""});
    }
    
    const onchange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})

    }
  return (
    <div className="row" style={{ marginTop: "20px" }}>
     
      <div className="col-md-12 col-sm-12 ">
        <h3>Add Notes</h3>
        <form action="">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              aria-describedby="emailHelp"
              onChange={onchange}
            />
            
          </div><br />
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={onchange}
              rows={3}
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="tag">Tag</label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onchange}
              rows={4}
            />
          </div><br />

          <button type="submit" onClick={handleClick} className="btn btn-primary">
            Add Note
          </button>
        </form>
        <br />
        <br />
      </div>
      
    </div>
  );
};

export default Addnote;
