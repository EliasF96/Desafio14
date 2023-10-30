import { useState } from 'react';
import './App.css';
import { AiFillStar } from "react-icons/ai";
import { AiOutlineClose } from 'react-icons/ai';
import {BsFillTrashFill, BsFillPencilFill} from "react-icons/bs";


function App() {
  const [note, setNote] = useState("")
  const [notes, setNotes] = useState([])
  const [newNote, setnewNote] = useState("")
  const [id, setId] = useState(null)
  const [active, setActive] = useState(Boolean)

  let inputadd = document.querySelector(".inputNotes")

  const addNote = (e)=>{
    e.preventDefault()
      setNotes([...notes, note])
      setNote("")
      console.log(notes)
      inputadd.value = ""
  }
  //ABRIR MODAL
  const openUpdateMenu = (index)=>{
    setId(index)
    setActive( true )
    setnewNote(notes[index])
  } 

  const setFavoriteState = (index)=>{
    notes[index].favoriteState = !(notes[index].favoriteState)
    setNotes([...notes])
  }
  const removeNote = index =>{
    const updateNotes = notes.filter((_,i) => i != index)
    setNotes(updateNotes)
    console.log(index)
  }

  const confirmUpdateNote = ()=>{
    notes.splice(id, 1, newNote)
    setnewNote("")
    setActive(!active)
 }
  return (
    <div className="noteList">
      <form onSubmit={addNote}>
        <input type="text"
        className='inputNotes'
        placeholder='Add your note here'
        onChange={ e=>{
          setNote({ note:e.target.value, favoriteState:false })
        }} />
        <button type="submit">Add note</button>
      </form>
      
      <ul>
        {   notes.map( (item, index) => (
            <li key={index}> {item.note} | {item.favoriteState}
              <BsFillTrashFill className="removeIcon" onClick={()=>removeNote(index)} />
              <AiFillStar className={ notes[index].favoriteState ? "favoriteIcon active" : "favoriteIcon" } onClick={()=> setFavoriteState(index) }/>
              <BsFillPencilFill className="editButton" onClick={()=>openUpdateMenu(index)} />
            </li> 
        ))}
      </ul>

        {/* UPDATE MENU */}
      <div className={active ? "updateMenu active" : "updateMenu"}>
        <input className='updateInput' type="text" value={newNote.note} onChange={e=> setnewNote({note:e.target.value, favoriteState:notes[id].favoriteState})}/>
        <button className='updateButton' onClick={()=> confirmUpdateNote()}>UPDATE</button>
        <AiOutlineClose onClick={ ()=> setActive(false) } className='closeIcon'></AiOutlineClose>
      </div>
    </div>
  );
}
export default App;