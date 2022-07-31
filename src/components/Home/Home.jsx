import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Home() {
  let token = localStorage.getItem("token");
  let decoded = jwtDecode(token);
  const [allNotes, setAllNotes] = useState([]);
  const [waiting, setWaiting] = useState(false);
  let [note, setNote] = useState({ title: '', desc: '', token, userID: decoded._id });
  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);


  async function getNotes() {
    let { data } = await axios.get("https://route-egypt-api.herokuapp.com/getUserNotes", {
      headers: {
        token,
        userID: decoded._id
      }
    });
    if(data.message==='success'){
      setAllNotes(data.Notes) 
      }

  }

  async function addNotes(e) {
    e.preventDefault();
    setWaiting(true);
    let {data}=await axios.post("https://route-egypt-api.herokuapp.com/addNote",note); 
    if(data.message==='success'){
    getNotes(); 
    setShowAdd(false);
    setWaiting(false);
    }
  }
  async function deleteNotes(_id) {
    let {data}=await axios.delete("https://route-egypt-api.herokuapp.com/deleteNote",{
      data:{
        NoteID:_id,
        token
      }
    }); 
    if(data.message==='deleted'){
      getNotes(); 
      }
    console.log(data)
    }


    function getFormValue(e){
      let myNote={...note};
      myNote[e.target.name]=e.target.value;
      setNote(myNote);

    }
    useEffect(() => {
      getNotes();
    });
  return (
    <>
      <div className="container">
      <Button variant="primary" onClick={handleShowAdd}>
      <i className="fas fa-plus-circle"></i> AddNew
      </Button>

{ /* <!-- ==========================Modal Add=============================== --> */}
      <Modal
       show={showAdd}
        onHide={handleCloseAdd}
        backdrop="static"
        keyboard={false}
      >
         
        <Modal.Header closeButton>
          <Modal.Title>AddNew</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
                <input onChange={getFormValue} placeholder="Type Title" name="title" className="form-control" type="text" />
                <textarea onChange={getFormValue} className="form-control my-2" placeholder="Type your note" name="desc" id="" cols="30" rows="10"></textarea>
            
        </Modal.Body>
        <Modal.Footer>
                <button type="button" className="btn btn-secondary" onClick={handleCloseAdd}>Close</button>
                <button type="submit" className="btn btn-info" onClick={addNotes}><i className="fas fa-plus-circle"></i> {waiting? "Waiting...."  : "Add Note"}</button>
        </Modal.Footer>

      </Modal>

      {/* <!-- ==========================Notes=============================== --> */}

      <div className="row">
        <>
      {allNotes&&allNotes.map((notes,index)=>{
        return(
      <div key={index} className="col-md-4 my-4 ">
        <div className="note p-4">
          <h3 className="float-left">{notes.title} </h3>
          <a  onClick={()=>deleteNotes(notes._id)} > <i className="fas fa-trash-alt float-right px-3 del"></i></a>
          <span className="clearfix"></span>
          <p> {notes.desc}</p>
        </div>
      </div>
       ) }
    
      )}
      </>
      </div>
      </div>
    </>
  )
  }
