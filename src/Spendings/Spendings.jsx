import React, { useState } from "react";
import "../Spendings/Spendings.css";
import api from "../api/expenses";

const Spendings = (props) => {
  const [label, setLabel] = useState("Edit");
  const [title, setTitle] = useState(props.title);
  
 const date = new Date (props.date)
  const updatedTitle = (event) => {
       setTitle(event.target.value);
  };
  const deleteItem = () => {
    props.onDelete(props.id);
  };
  const updateTitle = async () =>{
    await api.put(`/expenses/${props.id}` , {
      "id" : props.id,
       "title" : title,
       "amount" : props.cash,
       "date" : props.date
    })
    setLabel("Edit")
  }
  return (
    <div className="spends" >
      <table>
        <tbody  >
          <tr >
            <td>{date.toDateString()}</td>
            {/* <td  >{props.id}</td> */}
            {label === "Edit" ? (
              <td >{title}</td>
            ) : (
              <td >
                <input type="text" onChange={updatedTitle} />
              </td>
            )}
            <td >{props.cash}</td>
          </tr>
        </tbody>
      </table>
      {label === "Edit" ? (
        <button className="button" onClick={() => setLabel("Update")}>Edit</button>
      ) : (
        <button className="button" onClick={updateTitle}>Update</button>
      )}
      {label !== "Edit" ? (
        <button className="button disabled" onClick={deleteItem}  disabled>
          Delete
        </button>
      ) : (
        <button className="button" onClick={deleteItem}>Delete</button>
      )}
    </div>
  );
};
export default Spendings;
