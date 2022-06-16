import React, { useState } from "react";
import "../Spendings/Spendings.css";

const Spendings = (props) => {
  const [label, setLabel] = useState('Edit');
  const [title, setTitle] = useState(props.title);
  //const [del, setDel] = useState(props.title);
  
  const updatedTitle = (event) => {
    setTitle(event.target.value);
    console.log(props.title)
  };
  const deleteItem = ()=>{
    props.onDelete(props.title);
   
  }
  return (
 
    <div className="spens">
      <div>{props.date.toDateString()}</div>
      {label === "Edit" ? (
        <div>{title}</div>
      ) : (
        <input type="text" onChange={updatedTitle} />
      )}
      <div>{props.cash}</div>
      {label === "Edit" ? (
        <button onClick={() => setLabel("Update")}>Edit</button>
      ) : (
        <button onClick={() => setLabel("Edit")}>Update</button>
      )}
      <button onClick={deleteItem}>Delete</button>
      <br />
    </div>
   
  );
};
export default Spendings;
