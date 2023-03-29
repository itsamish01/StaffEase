// Need multiple models
import { Business } from "../models/business.js";
import { Employee } from "../models/employee.js";
// import { Review } from "../models/review.js";

const resolvers = {
  Query: {
    Business: async (_, __, context) => {
      if (context.user) {
        const businessData = await Business.findOne({
          _id: context.user.id,
        }).select("-__v -password");
        return businessData;
      }

      throw new Error("Not logged in");
    },
    Employee: async (_, __, context) => {
      if (context.user) {
        const employeeData = await Employee.findOne({
          _id: context.user.id,
        }).select("-__v -password");
        return employeeData;
      }

      throw new Error("Not logged in");
    },
  },

  Mutation: {
    // Sign up a new Business user
    addBusiness: async (_, args) => {
      const business = await Business.create(args);
      const token = await business.authenticate(args.password);
      return { token };
    },
    // Log in an existing Business user
    loginBusiness: async (_, { email, password }) => {
      console.log("hello");
      const business = await Business.findOne({ email });

      if (!business) {
        throw new Error("Incorrect credentials");
      }
      const token = business?.authenticate(password);

      return { token, business };
    },
    // Sign up a new Employee user
    addEmployee: async (_, args) => {
      const employee = await Employee.create(args);
      const token = await employee.authenticate(args.password);
      return { token };
    },
    // Log in an existing Employee user
    loginEmployee: async (_, { email, password }) => {
      console.log("hello");
      const employee = await Employee.findOne({ email });

      if (!employee) {
        throw new Error("Incorrect credentials");
      }
      const token = employee?.authenticate(password);

      return { token, employee };
    },
    // Update an Employee
    saveEmployee: async (_, { firstName, lastName }, context) => {
      console.log("helloEmployee");
      if (context.user) {
        const employeeData = await Employee.findOne({ firstName, lastName });
        const updatedBusiness = await Business.findByIdAndUpdate(
          { _id: context.user.id },
          { $push: { employees: employeeData } },
          { new: true }
        );

        return updatedBusiness;
      }

      throw new Error("You need to be logged in!");
    },
    // Delete an Employee
    removeEmployee: async (_, { employeeId }, context) => {
      if (context.user) {
        //console.log(employeeId);
        const updatedBusiness = await Business.updateOne(
          { _id: context.user.id },
          { $pull: { employees: { _id: employeeId } } }
        );
        // console.log(employeeId);
        //console.log(context.user.id);
        return updatedBusiness;
      }

      throw new Error("You need to be logged in!");
    },
    // Add a new Review (note: formerly saveCustomer)
    saveReview: async (
      _,
      { firstName, lastName, rating, comment },
      context
    ) => {
      console.log("Hello Customer");
      if (context.user) {
        const updatedBusiness = await Business.findByIdAndUpdate(
          { _id: context.user.id },
          { $push: { customers: { firstName, lastName, rating, comment } } },
          { new: true }
        );
        return updatedBusiness;
      }

      throw new Error("You need to be logged in!");
    },
    // Clock in an Employee
    // TODO: Isn't there supposed to be something to clock out the employee?
    clockinEmployee: async (_, { businessName }, context) => {
      console.log("helloEmployeeClock");
      if (context.user) {
        // TODO: Use some better variable names
        const employeePreB = await Employee.findById({ _id: context.user.id });
        let clockboolean = employeePreB.clockedin;
        clockboolean = !clockboolean;

        const assocBusiness = await Business.findOne({ businessName });
        assocBusiness.employees.id(context.user.id).clockedin = clockboolean;
        await assocBusiness.save();
        const updatedEmployee = await Employee.findByIdAndUpdate(
          { _id: context.user.id },
          { $set: { clockedin: clockboolean } }
        );
        return assocBusiness;
      }

      throw new Error("You need to be logged in!");
    },
    // TODO: write virtual
    // TODO: write a update current capacity
  },
};

export default resolvers;
