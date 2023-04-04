import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CLOCKIN } from "../schema/mutations";
export default function EmployeePage() {
  const [clockedIn, setClockedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(null);
  const [businessName, setBusinessName] = useState("");
  const [clockinEmployee, { error }] = useMutation(CLOCKIN);

  const handleInputChange = (e) => {
    setBusinessName(e);
  };
  const handleClockIn = (isClockingIn) => {
    if (!businessName) {
      return;
    }
    setClockedIn(!!isClockingIn);
    setCurrentTime(isClockingIn ? new Date() : null);

    try {
      clockinEmployee({
        variables: { businessName },
      });
      setBusinessName("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="px-4 text-center">
      <div className="EmployeeDashboard">
        <h2>Employee Dashboard</h2>
        <input
          value={businessName}
          style={{ color: "black" }}
          onChange={(e) => {
            handleInputChange(e.currentTarget.value);
          }}
        ></input>
        {clockedIn ? (
          <div>
            <p>Clocked in at: {currentTime.toLocaleTimeString()}</p>
            <button
              className="button mt-4 bg-green-500 hover:bg-green-300"
              onClick={() => handleClockIn(false)}
            >
              Clock Out
            </button>
          </div>
        ) : (
          <button
            className="button mt-4 bg-green-500 hover:bg-green-300"
            onClick={() => handleClockIn(true)}
          >
            Clock In
          </button>
        )}
      </div>
    </main>
  );
}
