import { useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  const user = true;
  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/icons8-home-50.png" alt="logo"></img>
          <span>WealthyEstate</span>
        </a>
        <a href="/home">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/agents">Agents</a>
      </div>
      <div className="right">
        {user ? (
          <div className="user">
            <img src="icons8-face-100 (1).png" alt="" />
            <span>John Doe</span>
            <Link to='/profile' className="profile">
              <div className="notification">3</div>
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/">Sign in</a>
            <a href="/" className="register">
              Sign out
            </a>
          </>
        )}
        <div className="menuIcon" onClick={() => setOpen(!open)}>
          <img src="/hamburger-menu.png" alt="hamburger" />
        </div>
        <div className={ open ? "menu active" : "menu"}>
          <a href="/home">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/agents">Agents</a>
          <a href="/signin">Sign In</a>
          <a href="/signup">Sign Up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
