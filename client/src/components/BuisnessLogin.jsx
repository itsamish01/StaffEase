import React, { useState } from 'react';
import axios from 'axios';

const BusinessLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [occupancy, setOccupancy] = useState(0);
  const [capacity, setCapacity] = useState(100);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/business/login', { email, password });
      if (response.status === 200) {
        setLoggedIn(true);
        setOccupancy(response.data.occupancy);
        setCapacity(response.data.capacity);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleOccupancyChange = async (newOccupancy) => {
    try {
      const response = await axios.put('/api/business/update-occupancy', { occupancy: newOccupancy });
      if (response.status === 200) {
        setOccupancy(newOccupancy);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {!loggedIn ? (
        <form onSubmit={handleSubmit}>
          <h2>Business Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      ) : (
        <div>
          <h2>Business Dashboard</h2>
          <p>Current occupancy: {occupancy}/{capacity}</p>
          <button onClick={() => handleOccupancyChange(Math.max(occupancy - 1, 0))}>Decrease Occupancy</button>
          <button onClick={() => handleOccupancyChange(Math.min(occupancy + 1, capacity))}>Increase Occupancy</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default BusinessLogin;
