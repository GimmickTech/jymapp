import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
const Navbar = (props) => {
  let [dark, setDark] = useState("light")

  return (
    <div>
      <ul className="ulNav">
        <NavLink to="/about">About</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        {dark==="light" ?  <li className="toggler" onClick={()=>{props.onDarkMode("Dark");setDark("dark")}}>
        Dark Mode
        </li> :<li className="toggler" onClick={()=>{props.onDarkMode("Light");setDark("light")}}>
        Light Mode
        </li>}
      </ul>
    </div>
  );
};
export default Navbar;
