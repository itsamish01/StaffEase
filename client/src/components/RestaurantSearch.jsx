// src/components/RestaurantSearch.js

import React, { useState } from "react";

function RestaurantSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic here
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="RestaurantSearch">
      <h2>Search Restaurants</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search restaurants"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default RestaurantSearch;
