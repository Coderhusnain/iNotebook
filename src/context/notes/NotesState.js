import noteContext from "./NotesContext";
import { useState } from "react";

const NoteState=(props)=>{
  const host="http://localhost:5000"
    const initialNotes=[]
    const[notes,setNotes]=useState(initialNotes)


// get alll notes
    const getNotes = async () => {
      let url=`${host}/api/notes/fetchallnotes`
      try{
          const response = await fetch(url, {
            method: "GET", 
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('token'),
              
            },
            
          });
          const json=await response.json(); 
          
      
    
      // // Create a new array with the new note and the existing notes
      // const updatedNotes = [...notes, newNote];
    
      // // Update the state with the new array
      setNotes(json);
        }catch (error) {
          console.log("error")
          console.error("Fetch error:", error);
        }
    };
    

 // Add a note
const addNote = async (title, description, tag) => {
  let url=`${host}/api/notes/addnotes`
      const response = await fetch(url, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token'),
        },
        
        body: JSON.stringify({title,description,tag}), 
      });
      const json= await response.json(); 
      
  

  // Create a new array with the new note and the existing notes
  const updatedNotes = [...notes, json];

  // Update the state with the new array
  setNotes(updatedNotes);
};


    // Delete a note
    const deleteNote= async (id)=>{
      let url=`${host}/api/notes/deletenotes/${id}`
      const response = await fetch(url, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token'),
          
        },
        
      });
      const updatedNotes = notes.filter((note) => note._id !== id);
      
      setNotes(updatedNotes);
      
    }



    // Edit a note
    const editNote=async (id,title,description,tag)=>{
      let url=`${host}/api/notes/updatenotes/${id}`
      const response = await fetch(url, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token'),
        },
        
        body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
      });
      const json=response.json(); 

      if (response.ok) {
        const updatedNotes = notes.map((note) =>
          note._id === id ? { ...note, title, description, tag } : note
        );
        setNotes(updatedNotes);
      } else {
        // Handle error response from the API
        console.error("Edit Note API error:", response);
      }
    }



return (
    <noteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote,getNotes}}>
        {props.children}
    </noteContext.Provider>
)
}

export default NoteState;