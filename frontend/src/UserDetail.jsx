// src/components/UserDetail.js

import React from "react";

const UserDetail = () => {
  // Sample user data
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    address: "1234 Elm Street, Springfield, IL",
    phone: "(123) 456-7890",
    joinedDate: "January 1, 2020"
  };

  return (
    <div className="user-detail">
      <h2>User Details</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Address:</strong> {user.address}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Member Since:</strong> {user.joinedDate}</p>
    </div>
  );
};

export default UserDetail;
