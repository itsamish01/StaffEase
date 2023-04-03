// src/components/EmployeeLogin.js
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function EmployeeLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement authentication logic here
    // If the authentication is successful, redirect to the dashboard
    history.push("/dashboard");
  };

  return (
    <div className="EmployeeLogin">
      <h2>Employee Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <email>Email:</email>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <password>Password:</password>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default EmployeeLogin;

