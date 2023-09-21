// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import './navbar.css'

const NavBar = () => {
  return (
    <nav>
      <h1>
        EMJ<span>CREATES</span>
      </h1>
      <ul className="navlinks">
        <li className="navlinks">
          <Link to="/">Home</Link>
        </li>
        <li className="navlinks">
          <Link to="/login">Sign In</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
