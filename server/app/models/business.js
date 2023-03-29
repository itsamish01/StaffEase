/**
 * @file models/business.js
 * @desc the Schema and model for the businesses.
 */
import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import config from "../../config.js";
import { encodeToken, handleError } from "../../utils.js";
import EmployeeSchema from "./employee.js";
import ReviewSchema from "./review.js";

// TODO: Why isn't contact a User?

const BusinessSchema = new Schema(
  {
    businessName: {
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
    description: {
      type: String,
      required: true,
      unique: false,
    },
    location: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
      unique: true,
    },
    currentCapacity: {
      type: Number,
      required: true,
    },
    maxCapacity: {
      type: Number,
      required: true,
    },
    employees: [EmployeeSchema],
    reviews: [ReviewSchema],
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
BusinessSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, config.saltRounds);
  }
  next();
});

// TODO: Why is there not a BusinessUser who is a type of User?
// custom method to compare and validate password for logging in
BusinessSchema.methods.authenticate = async function (password) {
  // 'this' references the document (user) that called this method
  const isCorrectPassword = bcrypt.compare(password, this.password);

  if (!isCorrectPassword) {
    // ⚠️ Don't reveal specifics about why authentication failed 🦉
    handleError(new Error("Invalid credentials."), "UNAUTHORIZED");
  }

  return encodeToken({
    username: this.username,
    id: this._id,
  });
};

const Business = model("Business", BusinessSchema);

export { BusinessSchema, Business };
