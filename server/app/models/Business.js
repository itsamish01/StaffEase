import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../config.js";
import { encodeToken, handleError } from "../../utils.js";
import { customerSchema } from "./Customer.js";
import { employeeSchema } from "./Employee.js";

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
    password: {
      type: String,
      required: true,
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
      required: false,
    },
    maxCapacity: {
      type: Number,
      required: true,
    },
    employeeOnCount: {
      type: Number,
      required: false,
    },
    employees: [employeeSchema],
    customers: [customerSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

BusinessSchema.virtual("empCount").get(function () {
  const hey = this.employees.map((element) => {
    if (element.clockedin) {
      return 1;
    } else {
      return 0;
    }
  });
  const calculateSum = (arr) => {
    return arr.reduce((total, current) => {
      return total + current;
    }, 0);
  };
  let empCount = calculateSum(hey);
  return empCount;
});

BusinessSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, config.saltRounds);
  }

  next();
});

BusinessSchema.methods.authenticate = async function (password) {
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
const Business = model("Business", BusinessSchema);

export { BusinessSchema, Business };
