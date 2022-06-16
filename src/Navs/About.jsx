import React, { useRef, useState } from "react";
import "./About.css";
const About = () => {
  const [validForm, setValidForm] = useState(false);
  const [touchedForm, setTOuchedForm] = useState(false);
  const userName = useRef();
  const age = useRef();
  const userNameBlur = (event) => {
    setTOuchedForm(true);
    if (userName.current.value !== "") {
      event.preventDefault();
      setValidForm(true);
    }
  };
  const formSubmit = (event) => {
    setTOuchedForm(true);
    if (userName.current.value === "" || age.current.value === "") {
      event.preventDefault();
      setValidForm(false);
    } else {
      setValidForm(true);
      event.preventDefault();
      console.log(userName.current.value);
      console.log(age.current.value);
      userName.current.value = "";
      age.current.value = "";
    }
  };
  const invalidForm = !validForm && touchedForm;
  return (
    <React.Fragment>
      <h3>User Form</h3>
      <hr />
      <form onSubmit={formSubmit}>
        <input
          type="text"
          ref={userName}
          onBlur={userNameBlur}
          placeholder="UserName"
        />
        <input type="number" ref={age}  placeholder="Age" />
        {invalidForm && <h4 className="invalid">Please fill all fields</h4>}
        <button type="submit">Submit</button>
      </form>
    </React.Fragment>
  );
};
export default About;
