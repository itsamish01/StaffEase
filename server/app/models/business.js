/**
 * @file models/business.js
 * @desc the Schema and model for the businesses.
 */
import { Schema, model } from 'mongoose';
import EmployeeSchema from './employee.js';
import ReviewSchema from './review.js';
import bcrypt from 'bcrypt';

const BusinessSchema = new Schema(
  {
    businessName: {
      type:     String,
      required: true,
      unique:   true,
    },
    email: {
      type:     String,
      required: true,
      unique:   true,
      match:    [/.+@.+\..+/, 'Must use a valid email address'],
    },
    description: {
      type:     String,
      required: true,
      unique:   false,
    },
    location: {
      type:     String,
      required: true,
    },
    contact:{
      type:     String,
      required: true,
      unique:   true
    },
    currentCapacity: {
      type:     Number,
      required: true,
    },
    maxCapacity:{
        type:    Number,
        required:true,
    },
    employees:[EmployeeSchema],
    reviews:[ReviewSchema]
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// has a user password
BusinessSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;                        // TODO: Replace this with a variable in a .env file
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// custom method to compare and validate password for logging in
BusinessSchema.methods.isCorrectPassword = async function (password){
  return bcrypt.compare(password, this.password);
}

const BusinessModel = model('Business', BusinessSchema);

export { BusinessSchema, BusinessModel };
