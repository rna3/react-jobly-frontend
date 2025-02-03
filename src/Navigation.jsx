import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "./UserContext";

function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);

  return (
    <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/companies">Companies</NavLink></li>
        <li><NavLink to="/jobs">Jobs</NavLink></li>
        {currentUser ? (
          <>
            <li><NavLink to="/profile">{currentUser.username}</NavLink></li>
            <li><button onClick={logout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/signup">Signup</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
