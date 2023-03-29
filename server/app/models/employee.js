/**
 * @file models/employee.js
 * @desc the Schema and model for the employees.
 */
import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import config from "../config.js";
import { encodeToken, handleError } from "../utils.js";
//import User from "./user.js";

// TODO: Why didn't we use User?

const EmployeeSchema = new Schema(
  {
    //users: [User],
    firstName: {
      type: String,
      required: true,
      unique: true,
    },
    lastName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    clockedin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// TODO: Why is there not a BusinessUser who is a type of User?
// has a user password
EmployeeSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, config.saltRounds);
  }
  next();
});

// TODO: Why is there not a BusinessUser who is a type of User?
// custom method to compare and validate password for logging in
EmployeeSchema.methods.authenticate = async function (password) {
  // 'this' references the document (user) that called this method
  const isCorrectPassword = bcrypt.compare(password, this.password);

  if (!isCorrectPassword) {
    // ⚠️ Don't reveal specifics about why authentication failed 🦉
    handleError(new Error("Invalid credentials."), "UNAUTHORIZED");
  }

  return encodeToken({
    username: this.username, // TODO: Where's the username?
    id: this._id,
  });
};

const Employee = model("Employee", EmployeeSchema);

export { EmployeeSchema, Employee };
