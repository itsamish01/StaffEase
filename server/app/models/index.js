/**
 * @file models/index.js
 * @desc The file for all models and their schemas.
 */
import { userSchema, userModel } from './user.js'
import { businessSchema, businessModel } from './business.js'
import { employeeSchema, employeeModel } from './employee.js'
import { reviewSchema, reviewModel } from './review.js'

const schemas = {
  userSchema,
  businessSchema,
  employeeSchema,
  reviewSchema
}

const models = {
  userModel,
  businessModel,
  employeeModel,
  reviewModel
}

export { schemas, models }
