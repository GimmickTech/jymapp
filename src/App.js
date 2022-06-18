import react, { useRef, useState } from "react";
import Spendings from "./Spendings/Spendings";
import "./App.css";
import AddSpendings from "./Spendings/AddSpendings";
import Filter from "./Spendings/Filter";
import Navbar from "./Spendings/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import About from "./Navs/About";
import Profile from "./Navs/Profile";
import Signin from "./User/Signin";
import React from "react";
import './Spendings/Spendings.css'

export default function App() {
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
  var [filExpense, setFilExpense] = useState(dummy);
  let [search, setSearch] = useState(false);
  let [searchItem, setSearchItem] = useState("");
  // var searchInput = useRef();
  let toggleDark = (event) => {
    console.log(event);
    if (event === "Dark") {
      document.getElementById("navbar").style.backgroundColor = "black";
      document.getElementById("navbar").style.color = "white";
      console.log(document.getElementById("navbar").style.color);
    } else if (event === "Light") {
      document.getElementById("navbar").style.backgroundColor = "white";
      document.getElementById("navbar").style.color = "black";
      console.log(document.getElementById("navbar").style.color);
    }
  };
  var addNewSpendings = (expense) => {
    setFilExpense((before) => {
      return [expense, ...before];
    });
  };
  var deleteExpense = (index) => {
    var newExpense = expense;
    newExpense.splice(index, 1);
    setFilExpense([...newExpense]);
  };
  const yearToFilter = (event) => {
    setSearch(false);
    var filteredArr = expense.filter((expenses) => {
      if (expenses.date.getFullYear().toString() === event) return expenses;
      if (event === "all") {
        return expenses;
      }
    });
    setFilExpense(filteredArr);
  };

  const searchTitle = (event) => {
    event.preventDefault();
    setSearch(true);
    setSearchItem(event.target.value);
    let searchword =  event.target.value.split(" ").join("").toLowerCase();
    let search = expense.filter((expense) => {
      if (expense.title.toLowerCase().includes(searchword)) return expense;
    });
    console.log(search);
    setFilExpense(search)
    setSearch(false);
    event.current.value = "";
  };
  return (
    <div className="table">
      <Navbar onDarkMode={toggleDark} />

      <Signin />

      <Routes>
        <Route path="/" element={<Navigate to="/profile" />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
      <AddSpendings onAddSpendings={addNewSpendings} />

      <div className="ulBlock" id="navbar">
        <p className="liBlock">Date</p>
        <p className="liBlock">Spendings</p>
        <p className="liBlock">Amount</p>

      <input className="liBlock , inpSearch" type="text" value={searchItem} placeholder="Search For Expense" onChange={searchTitle} />
        <Filter onFilter={yearToFilter} />
      </div>
      {/* <form className="searchField" onSubmit={searchTitle}> */}

      {/* <button className="button" type="submit"> Search</button> */}
      {/* </form> */}
      {filExpense.length <= 0 && (
        <div className="alertbox hei">No Expenses found</div>
      )}
      {!search &&
        filExpense.map((expenses, index) => (
          <Spendings
            index={index}
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
