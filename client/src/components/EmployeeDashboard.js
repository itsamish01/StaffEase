// src/components/EmployeeDashboard.js

import React, { useState } from "react";

function EmployeeDashboard() {
  const [clockedIn, setClockedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(null);

  const handleClockIn = () => {
    setClockedIn(true);
    setCurrentTime(new Date());
  };

  const handleClockOut = () => {
    setClockedIn(false);
    setCurrentTime(null);
  };

  return (
    <div className="EmployeeDashboard">
      <h2>Employee Dashboard</h2>
      {clockedIn ? (
        <div>
          <p>Clocked in at: {currentTime.toLocaleTimeString()}</p>
          <button onClick={handleClockOut}>Clock Out</button>
        </div>
      ) : (
        <button onClick={handleClockIn}>Clock In</button>
      )}
    </div>
  );
}

export default EmployeeDashboard;
