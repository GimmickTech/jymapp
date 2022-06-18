import { useState } from "react";
import "../../src/Spendings/AddSpendings.css";
import { Button } from "@mui/material";

function AddSpendings(props) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const updateTitle = (event) => {
    console.log(event.target.value)
    setTitle(event.target.value);
  };
  const updateAmount = (event) => {
    setAmount(event.target.value);
  };
  const updateDate = (event) => {
    setDate(event.target.value);
  };
  const addedSpend = (event) => {
    event.preventDefault();
    const spendings = {
      id: Math.floor(Math.random() * 101),
      title: title,
      amount: amount,
      date: new Date(date),
    };
    props.onAddSpendings(spendings);
    setTitle("");
    setAmount("");
    setDate("");
  };
  return (
    <div className="spendiv">
      <form onSubmit={addedSpend}>
        <fieldset>
          <legend > Add New Spendings</legend>
       
        <div className="liSign">
          <p className="spens">Spendings</p>
          <input type="text" value={title} required onChange={updateTitle} />
        </div>
        <div className="liSign">
          <p className="spens">Amount</p>
          <input
            type="number"
            value={amount}
            required
            onChange={updateAmount}
          />
        </div>
        <div className="liSign">
          <p className="spens">Date</p>
          <input type="date" value={date} required onChange={updateDate} />
          <br />
        </div>
        <div className="pn">
          <button type="submit" className="buttons">
            Submit
          </button>
        </div>
        </fieldset>
      </form>
      {/* <iframe src="https://justees.netlify.app/" frameborder="0" allowFullScreen="true"></iframe> */}
    </div>
  );
}

export default AddSpendings;
