// src/components/ReviewForm.js

import React, { useState } from "react";

function ReviewForm() {
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement review submission logic here
    console.log("Submitting review:", reviewText);
  };

  return (
    <div className="ReviewForm">
      <h2>Submit a Review</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your review here"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default ReviewForm;
