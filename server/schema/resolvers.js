const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

// Need multiple models
const { User } = require("../models");

const resolvers = {
    Query: {
      business: async (_, __, context) => {
        if (context.business) {
          const businessData = await Business.findOne({ _id: context.business._id }).select(
            "-__v -password"
          );
  
          return businessData;
        }
  
        throw new AuthenticationError("Not logged in");
      },
      employee: async (_, __, context) => {
        if (context.employee) {
          const employeeData = await Employee.findOne({ _id: context.employee._id }).select(
            "-__v -password"
          );
  
          return employeeData;
        }
  
        throw new AuthenticationError("Not logged in");
      },
    },
  
    Mutation: {
      addBusiness: async (_, args) => {
        const business = await Business.create(args);
        const token = signToken(business);
  
        return { token, business };
      },
      loginBusiness: async (_, { email, password }) => {
        console.log("hello");
        const business = await Business.findOne({ email });
  
        if (!business) {
          throw new AuthenticationError("Incorrect credentials");
        }
  
        const correctPw = await business.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError("Incorrect credentials");
        }
  
        const token = signToken(business);
        return { token, business };
      },
      addEmployee: async (_, args) => {
        const employee = await Employee.create(args);
        const token = signToken(employee);
  
        return { token, employee };
      },
      loginEmployee: async (_, { email, password }) => {
        console.log("hello");
        const employee = await Employee.findOne({ email });
  
        if (!employee) {
          throw new AuthenticationError("Incorrect credentials");
        }
  
        const correctPw = await employee.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError("Incorrect credentials");
        }
  
        const token = signToken(user);
        return { token, employee };
      },
      saveEmployee: async (_, { employeeData }, context) => {
        console.log("helloEmployee");
        if (context.business) {
          const updatedBusiness = await Business.findByIdAndUpdate(
            { _id: context.business._id },
            { $push: { employees: employeeData } },
            { new: true }
          );
  
          return updatedBusiness;
        }
  
        throw new AuthenticationError("You need to be logged in!");
      },
      removeEmployee: async (_, { employeeId }, context) => {
        if (context.business) {
          const updatedBusiness = await Business.findOneAndUpdate(
            { _id: context.business._id },
            { $pull: { employees: { employeeId } } },
            { new: true }
          );
  
          return updatedBusiness;
        }
  
        throw new AuthenticationError("You need to be logged in!");
      },
      saveCustomer: async (_, { customerData }, context) => {
        console.log("helloEmployee");
        if (context.business) {
          const updatedBusiness = await Business.findByIdAndUpdate(
            { _id: context.business._id },
            { $push: { customers: customerData } },
            { new: true }
          );
  
          return updatedBusiness;
        }
  
        throw new AuthenticationError("You need to be logged in!");
      },
      clockinEmployee: async (_, { clockedin }, context) => {
        console.log("helloEmployee");
        if (context.employee) {
          const updatedEmployee = await Employee.findByIdAndUpdate(
            { _id: context.employee._id },
            { $push: { employee: clockedin } },
            { new: true }
          );
  
          return updatedEmployee;
        }
  
        throw new AuthenticationError("You need to be logged in!");
      },
    },
  };
  
  module.exports = resolvers;
  