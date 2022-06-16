import { useState } from "react";
import "../../src/Spendings/AddSpendings.css";

function AddSpendings(props) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const updateTitle = (event) => {
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
        <div className="pn" >
          <p className="spens"> Add New Spendings</p>
          <hr />
        </div>
        <p className="spens">Spendings</p>
        <input type="text" value={title} required onChange={updateTitle} />

        <p className="spens">Amount</p>
        <input type="number" value={amount} required onChange={updateAmount} />

        <p className="spens">Date</p>
        <input type="date" value={date} required onChange={updateDate} />
        <br />
<div className="pn">
<button type="submit">Submit</button>
</div>
       
      </form>
    </div>
  );
}

export default AddSpendings;
