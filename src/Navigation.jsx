import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "./UserContext";
import "./styles/Navigation.css";

function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);

  return (
    <nav>
      {/* Left side - Home Link */}
      <div className="nav-left">
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
          Home
        </NavLink>
      </div>

      {/* Right side - All other Links */}
      <div className="nav-right">
        <ul>
          <li>
            <NavLink to="/companies" className={({ isActive }) => (isActive ? "active" : "")}>
              Companies
            </NavLink>
          </li>
          <li>
            <NavLink to="/jobs" className={({ isActive }) => (isActive ? "active" : "")}>
              Jobs
            </NavLink>
          </li>
          {currentUser ? (
            <>
              <li>
                <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
                  {currentUser.username}
                </NavLink>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup" className={({ isActive }) => (isActive ? "active" : "")}>
                  Signup
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
