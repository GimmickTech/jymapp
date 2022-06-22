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

  useEffect(() => {
    exp();
  }, []);
  async function  exp()  {
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
        console.log("ash")
        setSearch(false);
        if (user) {
          setExpense(user);
          setFilExpense(user);
        }
      })
      .catch((err) => console.log("Api" + err));
  };
  let toggleDark = (event) => {
    if (event === "Dark") {
      document.getElementById("navbar").style.backgroundColor = "black";
      document.getElementById("navbar").style.color = "white";
    } else if (event === "Light") {
      document.getElementById("navbar").style.backgroundColor = "white";
      document.getElementById("navbar").style.color = "black";
    }
  };
  var addNewSpendings = async (expenseNew) => {
    setSearch(false)
    console.log(expenseNew)
    await api.post("/expenses", expenseNew).then((response) => {
      setExpense((prev) => {
        return [...prev, response.data];
        // return vvar.reverse();
      });
      setFilExpense((prev) => {
        const vvar = [...prev, response.data];
        return vvar.reverse();
      });
    });
  };

  var deleteExpense = async (id) => {
    setSearch(false);
    console.log(expense);
    await api.delete(`/expenses/${id}`);
    // exp();
    const del = expense.filter((expense) => {
      if (expense.id !== id) {
        return expense;
      }
      else return console.log("NoExpense");
    });
    setSearch(false);
    setExpense(del);
    console.log(del);
    setFilExpense(del);
  };
  const yearToFilter = (event) => {
    setSearch(false);
    var filteredArr = expense.filter((expenses) => {
      if (expenses.date.getFullYear().toString() === event) return expenses;
      else if (event === "all") {
        return expenses;
      } 
      else return console.log("NoExpense");
    });
    setFilExpense(filteredArr);
  };

  const searchTitle = async (event) => {
    event.preventDefault();
    // setLoadSpen(false)
    setSearch(true);
    setSearchItem(event.target.value);
    let searchword = event.target.value.split(" ").join("").toLowerCase();

    let search = expense.filter((expense) => {
      if (expense.title.toLowerCase().includes(searchword)) return expense;
      else return console.log("NoExpense");
    });
    console.log(search);
    await setFilExpense(search);
    // setLoadSpen(false)
    setSearch(false);
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
          element={<AddSpendings onAddSpendings={addNewSpendings} />}
        ></Route>
      </Routes>
      <div className="ulBlock " id="navbar">
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
      {/* <hr className="hr" /> */}
      {/* <form className="searchField" onSubmit={searchTitle}> */}

      {/* <button className="button" type="submit"> Search</button> */}
      {/* </form> */}
      {/* {loadSpen && filExpense.length <= 0 && <h1  className="alertbox hei">Loading ...</h1>} */}
      {filExpense.length <= 0 && (
        <div className="alertbox hei">
          <h1>No Expenses found</h1>
        </div>
      )}
      {!search  &&
        filExpense.map((expenses, index) => (
          <Spendings
            key={expenses.id}
            index={index}
            id={expenses.id}
            title={expenses.title}
            cash={expenses.amount}
            date={expenses.date}
            onDelete={deleteExpense}
          />
        ))}
    </div>
  );
}
