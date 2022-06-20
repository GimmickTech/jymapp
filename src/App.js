import { useEffect, useState } from "react";
import Spendings from "./Spendings/Spendings";
import "./App.css";
import api from "./api/expenses";
import AddSpendings from "./Spendings/AddSpendings";
import Filter from "./Spendings/Filter";
import Navbar from "./Spendings/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
// import About from "./Navs/About";
// import Profile from "./Navs/Profile";
import Signin from "./User/Signin";
import React from "react";
import "./Spendings/Spendings.css";

export default function App() {
  var [expense, setExpense] = useState([]);
  var [filExpense, setFilExpense] = useState(expense);
  let [search, setSearch] = useState(false);
  let [searchItem, setSearchItem] = useState("");
  // let [addSpen, setAddSpen] = useState(false);
  

  useEffect(() => {
    const exp = async () => {
      return await api
        .get("/expenses")
        .then((response) =>
          response.data.map((user) => ({
            id: `${user.id}`,
            title: `${user.title}`,
            amount: `${user.amount}`,
            date: new Date(`${user.date}`),
          }))
        )
        .then((user) => {
          setSearch(false);
          if (user) {
            setExpense((expense) => {
              return [user, ...expense];
            })
            setFilExpense(user)
          }
        })
        .catch((err) => console.log("Api" + err));
    };
    exp();
  }, []);

  let toggleDark = (event) => {
    if (event === "Dark") {
      document.getElementById("navbar").style.backgroundColor = "black";
      document.getElementById("navbar").style.color = "white";
    } else if (event === "Light") {
      document.getElementById("navbar").style.backgroundColor = "white";
      document.getElementById("navbar").style.color = "black";
    }
  };
  var addNewSpendings = async (expense) => {
    // let exp = (before) => {
    //   return [expense, ...before];
    // };
    const response = await api.post("/expenses", expense);
    console.log(response);
    setExpense(expense, ...response);
    setFilExpense(expense, ...response);
    // setAddSpen(false);
  };
  var deleteExpense = (index) => {
   // await api.delete(`/expenses/${index}`)
   console.log(index)
    var newExpense = expense;
    console.log(newExpense.slice(index,1))
     setFilExpense([...newExpense]);
  };
  const yearToFilter = (event) => {
    setSearch(false);
    var filteredArr = expense.filter((expenses) => {
      if (expenses.date.getFullYear().toString() === event) return expenses;
      else if (event === "all") {
        return expenses;
      } else return;
    });
    setFilExpense(filteredArr);
  };

  const searchTitle = (event) => {
    event.preventDefault();
    setSearch(true);
    setSearchItem(event.target.value);
    let searchword = event.target.value.split(" ").join("").toLowerCase();
    let search = expense.filter((expense) => {
      if (expense.title.toLowerCase().includes(searchword)) return expense;
      else return;
    });
    setFilExpense(search);
    setSearch(false);
    event.current.value = "";
  };
  return (
    <div className="table">
      <Navbar onDarkMode={toggleDark} />
      <Routes>
        <Route path="/" element={<Navigate to="/home/*" />}></Route>
        <Route path="/profile" element={<Signin />}></Route>
        <Route path="/home" element={<App />}></Route>
        <Route
          path="/add-spendings"
          element={
            <AddSpendings
              onAddSpendings={addNewSpendings}
            />
          }
        ></Route>
      </Routes>
      <div className="ulBlock" id="navbar">
        <p className="liBlock">Date</p>
        <p className="liBlock">Spendings</p>
        <p className="liBlock">Amount</p>
        <input
          className="liBlock , inpSearch"
          type="text"
          value={searchItem}
          placeholder="Search For Expense"
          onChange={searchTitle}
        />
        <Filter onFilter={yearToFilter} />
      </div>
      {/* <div className="addSp">
        {addSpen ? (
          <AddSpendings onAddSpendings={addNewSpendings}  />
        ) : (
          <button
            onClick={() => {
              setAddSpen(true);
            }}
          >
            Add New Spendings
          </button>
        )}
      </div> */}
      <hr className="hr" />
      {/* <form className="searchField" onSubmit={searchTitle}> */}

      {/* <button className="button" type="submit"> Search</button> */}
      {/* </form> */}
      {filExpense.length <= 0 && (
        <div className="alertbox hei">
          <h1>No Expenses found</h1>
        </div>
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
