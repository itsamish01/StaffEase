/**
 * @file models/index.js
 * @desc The file for all models and their schemas.
 */
import { Business, BusinessSchema } from "./business.js";
import { Employee, EmployeeSchema } from "./employee.js";
import { Review, ReviewSchema } from "./review.js";
import { User, UserSchema } from "./user.js";

const schemas = {
  UserSchema,
  BusinessSchema,
  EmployeeSchema,
  ReviewSchema,
};

const models = {
  User,
  Business,
  Employee,
  Review,
};

export { schemas, models };
