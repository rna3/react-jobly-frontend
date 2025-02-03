import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import JoblyApi from "./api";
import UserContext from "./UserContext";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from './Navigation';
import Home from './components/Home';
import CompanyList from './components/CompanyList';
import CompanyDetail from './components/CompanyDetail';
import Jobs from './components/Jobs';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';


function App() {
  const [token, setToken] = useLocalStorage("token");
  const [currentUser, setCurrentUser] = useState(null);
  const [applications, setApplications] = useState(new Set());

  // Fetch user details when the token changes
  useEffect(() => {
    async function fetchUser() {
      if (token) {
        try {
          const { username } = jwtDecode(token);
          JoblyApi.token = token;
          let user = await JoblyApi.getCurrentUser(username);
          setCurrentUser(user);
          setApplications(new Set(user.applications));
        } catch (error) {
          console.error("Error loading user:", error);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    }
    fetchUser();
  }, [token]);

  /** Login function */
  async function login(credentials) {
    try {
      let newToken = await JoblyApi.login(credentials);
      setToken(newToken);
      return { success: true };
    } catch (err) {
      return { success: false, errors: err };
    }
  }

  /** Signup function */
  async function signup(userData) {
    try {
      let newToken = await JoblyApi.signup(userData);
      setToken(newToken);
      return { success: true };
    } catch (err) {
      return { success: false, errors: err };
    }
  }

  /** Update user function */
  async function updateUserProfile(username, data) {
    try {
      let updatedUser = await JoblyApi.updateUser(username, data);
      setCurrentUser(updatedUser);  // Update global user state
      return { success: true };
    } catch (err) {
      return { success: false, errors: err };
    }
  }

  /** Apply to a job function */
  async function applyToJob(jobId) {
    if (applications.has(jobId)) return; // Prevent duplicate applications
    try {
      await JoblyApi.applyToJob(currentUser.username, jobId);
      setApplications(new Set([...applications, jobId])); // Update applied jobs
    } catch (err) {
      console.error("Error applying to job:", err);
    }
  }

  /** Logout function */
  function logout() {
    setToken(null);
    setCurrentUser(null);
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser, applications, applyToJob }}>
        <Navigation logout={logout}/>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/companies" element={currentUser ? <CompanyList /> : <Navigate to="/login" />} />
          <Route path="/companies/:handle" element={currentUser ? <CompanyDetail /> : <Navigate to="/login" />} />
          <Route path="/jobs" element={currentUser ? <Jobs /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/signup" element={<Signup signup={signup} />} />
          <Route path="/profile" element={currentUser ? <Profile updateUserProfile={updateUserProfile} /> : <Navigate to="/login" />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
