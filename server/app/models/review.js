/**
 * @file models/review.js
 * @desc the Schema and model for reviews.
 * Note: Customers are now Reviews since this create a review of a business not a customer.
 * Wishlist: Customers as users (We probably should have done this.)
 */
import { model, Schema } from "mongoose";

const ReviewSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      unique: false,
    },
    lastName: {
      type: String,
      required: true,
      unique: false,
    },
    rating: {
      type: String,
      required: true,
      unique: false,
    },
    comment: {
      type: String,
      required: true,
      unique: false,
    },
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: {
      // TODO: Double check this
      createdAt: true,
      updatedAt: false,
    },
  }
);

const ReviewModel = model("Review", ReviewSchema);

export { ReviewSchema, ReviewModel };
