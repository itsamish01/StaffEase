/**
 * @file models/review.js
 * @desc the Schema and model for reviews.
 */
import { Schema, model } from 'mongoose';

const ReviewSchema = new Schema(
  {
    firstName: {
      type:     String,
      required: true,
      unique:   false,
    },
    lastName: {
      type:     String,
      required: true,
      unique:   false,
    },
    rating: {
      type:     String,
      required: true,
      unique:   false,
    },
    comment: {
      type:     String,
      required: true,
      unique:   false,
    },
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true
    },
    timestamps: {         // TODO: Double check this
      createdAt: true,
      updatedAt: false
    }
  }
);

const ReviewModel = model('Review', ReviewSchema);

export { ReviewSchema, ReviewModel };
