/**
 * @file models/employee.js
 * @desc the Schema and model for the employees.
 */
import { Schema, model } from 'mongoose';
import UserSchema from './user.js';

const EmployeeSchema = new Schema(
  {
    users: [UserSchema],
    clocked:{
        type:     Boolean,
        required: true
    }
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const EmployeeModel = model('Employee', EmployeeSchema);

export { EmployeeSchema, EmployeeModel };
