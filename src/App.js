import react, { useState } from "react";
import Spendings from "./Spendings/Spendings";
import "./App.css";
import AddSpendings from "./Spendings/AddSpendings";
import Filter from "./Spendings/Filter";
import Navbar from "./Spendings/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import About from "./Navs/About";
import Profile from "./Navs/Profile";
import Signin from "./User/Signin";

export default function App(props) {
  var dummy = [
    { id: "01", title: "Meal", amount: "10", date: new Date(2022, 5, 12) },
    { id: "02", title: "Job", amount: "10", date: new Date(2020, 5, 12) },
    { id: "03", title: "Ml", amount: "10", date: new Date(2020, 5, 12) },
    { id: "04", title: "ash", amount: "10", date: new Date(2020, 5, 12) },
    { id: "05", title: "nir", amount: "10", date: new Date(2020, 5, 12) },
    { id: "06", title: "Meal", amount: "10", date: new Date(2022, 5, 12) },
    { id: "07", title: "Job", amount: "10", date: new Date(2020, 5, 12) },
    { id: "08", title: "Ml", amount: "10", date: new Date(2020, 5, 12) },
    { id: "09", title: "ash", amount: "10", date: new Date(2020, 5, 12) },
    { id: "10", title: "nir", amount: "10", date: new Date(2020, 5, 12) },
    { id: "11", title: "Meal", amount: "10", date: new Date(2022, 5, 12) },
    { id: "12", title: "Job", amount: "10", date: new Date(2020, 5, 12) },
    { id: "13", title: "Ml", amount: "10", date: new Date(2020, 5, 12) },
    { id: "14", title: "ash", amount: "10", date: new Date(2020, 5, 12) },
    { id: "15", title: "nir", amount: "10", date: new Date(2019, 5, 12) },
  ];
  var [expense, setExpense] = useState(dummy);
  var addNewSpendings = (expenses) => {
    setExpense((before) => {
      return [expenses, ...before];
    });
  };
  var deleteExpense = (event) => {
    for (let i = 0; i <= expense.length; i++) {
      if (expense[i].title.includes(event)) {
        console.log(i);
        var newExpense = expense;
        newExpense.splice(i, 1);
        setExpense([...newExpense]);
      }
    }
  };
  const yearToFilter = (event) => {
    console.log("App " + event);

    var filteredArr = expense.filter((expenses) => {
      if (expenses.date.getFullYear().toString() === event)
     return expenses
    });
    setExpense(filteredArr)
    console.log(expense)
  }
  ;

  return (
    <div className="table">
      <Navbar />

      {/* <Signin /> */}

      <Routes>
        <Route path="/" element={<Navigate to="/profile" />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
      <AddSpendings onAddSpendings={addNewSpendings} />

      <ul className="ulBlock">
        <li className="liBlock">Date</li>
        <li className="liBlock">Spendings</li>
        <li className="liBlock">Amount</li>
        <li className="liBlock">
          <input type='text' placeholder="Search Expenses"/>
        </li>
        <li className="liBlock">
          {" "}
          <Filter onFilter={yearToFilter} />
        </li>
      </ul>

      {expense.length <= 0 && <div className="alertbox">No Expenses found</div>}
      {expense.map((expenses) => (
        <Spendings
          key={expenses.id}
          title={expenses.title}
          cash={expenses.amount}
          date={expenses.date}
          onDelete={deleteExpense}
        />
      ))}
    </div>
  );
}
