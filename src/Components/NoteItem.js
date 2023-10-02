import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NotesContext";
import { useEffect } from "react";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { note,updateNote } = props;
  const { deleteNote } = context;

  const onDelete = (e) => {
    e.preventDefault();
    props.showAlert("Note Deleted","success")

    return deleteNote(note._id);
  };
  return (
    <>
      <div className="col-md-4">
        <div className="card my-2">
          <div className="card-body mx-3">
            <h5 className="card-title">{note.title}</h5>
            <hr />
            <p className="card-text">{note.description}</p>
            <hr />
            <div>
            <p className="card-text" id="tag_value">{note.tag}</p>

            </div>
            
            <hr />
            <i
              className="fa fa-edit"
              style={{ fontSize: "31px", color: "black" }} onClick={()=>{updateNote(note)}}
            ></i>
            <i
              className="material-icons"
              style={{
                color: "black",
                marginLeft: "75%",
                fontSize: "30px",
              }}
              onClick={onDelete}
            >
              delete
            </i>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
