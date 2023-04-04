import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../config.js";
import { encodeToken, handleError } from "../../utils.js";
// import userSchema from './users';

const employeeSchema = new Schema(
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
employeeSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, config.saltRounds);
  }

  next();
});

employeeSchema.methods.authenticate = async function (password) {
  const isCorrectPassword = await bcrypt.compare(
    password,

    // 'this' references the document (user) that called this method
    this.password
  );

  if (!isCorrectPassword) {
    // ⚠️ Don't reveal specifics about why authentication failed 🦉
    handleError(new Error("Invalid credentials."), "UNAUTHORIZED");
  }

  return encodeToken({ username: this.username, id: this._id });
};
const Employee = model("Employee", employeeSchema);

export { employeeSchema, Employee };
