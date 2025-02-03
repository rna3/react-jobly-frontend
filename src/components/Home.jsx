import React, { useContext } from "react";
import UserContext from "../UserContext";

function Home() {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      {currentUser ? (
        <h1>Welcome back, {currentUser.firstName}!</h1>
      ) : (
        <>
          <h1>Welcome to Jobly</h1>
          <p>Sign up or log in to find jobs and companies.</p>
        </>
      )}
    </div>
  );
}

export default Home;
