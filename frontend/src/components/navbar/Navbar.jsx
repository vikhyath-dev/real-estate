import { useContext, useEffect, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const fetch = useNotificationStore(state => state.fetch);
  const number = useNotificationStore(state => state.number);

  useEffect(() => {
    if (currentUser) {
      fetch()
    }
  },[currentUser, fetch])

  //fetch();

  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/icons8-home-50.png" alt="logo"></img>
          <span>WealthyEstate</span>
        </a>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img
              src={currentUser.avatar || "/icons8-customer-100.png"}
              alt="avatar"
            />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              {number > 0 && <div className="notification">{number}</div>}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Sign in</a>
            <a href="/register" className="register">
              Sign up
            </a>
          </>
        )}
        <div className="menuIcon" onClick={() => setOpen(!open)}>
          <img src="/hamburger-menu.png" alt="hamburger" />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <button className="closeMenu" onClick={() => setOpen(false)}>
            X
          </button>
          <a href="/">Home</a>
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
