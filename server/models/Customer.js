import { Schema, model } from 'mongoose';

const customerSchema = new Schema(
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
      virtuals:  true,
    },
    timestamps: {         // TODO: Double check this
      createdAt: true,
      updatedAt: false
    }
  }
);

const Customer = model('Customer',customerSchema);

export {customerSchema, Customer}