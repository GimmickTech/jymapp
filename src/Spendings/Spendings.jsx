import React, { useState } from "react";
import "../Spendings/Spendings.css";

const Spendings = (props) => {
  const [label, setLabel] = useState("Edit");
  const [title, setTitle] = useState(props.title);
  //const [del, setDel] = useState(props.title);

  const updatedTitle = (event) => {
    setTitle(event.target.value);
    console.log(props.title);
  };
  const deleteItem = () => {
    props.onDelete(props.index);
  };
  return (
    <div className="spends">
      <table>
        <tbody>
          <tr>
            <td>{props.date.toDateString()}</td>
            {label === "Edit" ? (
              <td>{props.title}</td>
            ) : (
              <td>
                <input type="text" onChange={updatedTitle} />
              </td>
            )}
            <td>{props.cash}</td>
          </tr>
        </tbody>
      </table>
      {label === "Edit" ? (
        <button className="button" onClick={() => setLabel("Update")}>Edit</button>
      ) : (
        <button className="button" onClick={() => setLabel("Edit")}>Update</button>
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
