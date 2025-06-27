import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./screens/signUp/SignUp";
import Login from "./screens/login/Login";
import Profile from "./screens/profile/Profile";
import AdminHome from "./adminPanel/adminHome/AdminHome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/adminHome" element={<AdminHome />} />
      </Routes>
    </Router>
  );
}

export default App;
