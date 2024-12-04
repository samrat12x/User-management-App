// src/components/UserDashboard.js

import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import UserDetail from "./UserDetail";
import "./UserDashboard.css"; // Optional: Import CSS file for styling

const UserDashboard = () => {
  return (
    <div className="user-dashboard">
      <Sidebar />
      <div className="main-content">
        <Header />
        <UserDetail />
      </div>
    </div>
  );
};

export default UserDashboard;
