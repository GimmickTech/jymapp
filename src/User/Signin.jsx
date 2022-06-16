import React, { useRef, useState } from "react";
import "./Signin.css";
const Signin = () => {
  const userName = useRef();
  const password = useRef();
  const [validForm, setValidForm] = useState(true);
  const [touchedForm, setTouchedForm] = useState(false);
  const formTouch = (event) => {
    setTouchedForm(true);
    if (userName.current.value !== "") {
      event.preventDefault();
      document.getElementById("inval").style.backgroundColor = "green";
      setValidForm(true);
    }
  };
  const signinForm = (event) => {
    setTouchedForm(true);
    event.preventDefault();
    if (userName.current.value === "" && password.current.value === "") {
      setValidForm(false);
      document.getElementById("inval").style.backgroundColor = "red";
      alert("      PLEASE USE VALID CREDENTIALS   !!!    ");
      return;
    }
    setValidForm(true);
    console.log(userName.current.value);
    console.log(password.current.value);
    userName.current.value = "";
    password.current.value = "";
  };
  const invalid = !validForm && touchedForm;
  return (
    <div className="spendiv">
    <form action="" className="formsign" onSubmit={signinForm}>
      <div className="liSign">
        <h2>SIGN UP</h2>
      </div>
      <div className="liSign">
        <h5>User Name</h5>
        <input ref={userName} onBlur={formTouch} className="inp" type="text" />
      </div>
      <div className="liSign">
        <h5>Password</h5>

        <input ref={password}  className="inp" type="password" />
      </div>
      {invalid && (
        <div className="alertbox">
          <p className="inv">Invalid Form</p>
        </div>
      )}
      <div className="liSign">
        <button className="btnSub" id="inval" type="submit">
          Sign Up
        </button>
      </div>
    </form>
    
    </div>
  );
};
export default Signin;
