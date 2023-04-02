// Need multiple models
import { Employee } from "../models/Employee.js";
import { Business } from "../models/Business.js";
// import { Customer } from "../models/Customer.js";

const resolvers = {
  Query: {
    BusinessAll: async () => {
      const businessAllData = await Business.find({});

      return businessAllData;
    },
    Business: async (_, __, context) => {
      if (context.user) {
        const businessData = await Business.findOne({
          _id: context.user.id,
        }).select("-__v -password");

        businessData.employeeOnCount = businessData.empCount;

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
    addBusiness: async (_, args) => {
      const business = await Business.create(args);
      const token = await business.authenticate(args.password);
      return { token };
    },
    loginBusiness: async (_, { email, password }) => {
      const business = await Business.findOne({ email });

      if (!business) {
        throw new Error("Incorrect credentials");
      }
      const token = business?.authenticate(password);

      return { token, business };
    },
    addEmployee: async (_, args) => {
      const employee = await Employee.create(args);
      const token = await employee.authenticate(args.password);
      return { token };
    },
    loginEmployee: async (_, { email, password }) => {
      const employee = await Employee.findOne({ email });

      if (!employee) {
        throw new Error("Incorrect credentials");
      }
      const token = employee?.authenticate(password);

      return { token, employee };
    },
    saveEmployee: async (_, { firstName, lastName }, context) => {
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
    removeEmployee: async (_, { employeeId }, context) => {
      if (context.user) {
        const updatedBusiness = await Business.findOneAndUpdate(
          { _id: context.user.id },
          { $pull: { employees: { _id: employeeId } } }
        );

        return updatedBusiness;
      }

      throw new Error("You need to be logged in!");
    },
    saveCustomer: async (
      _,
      { businessName, firstName, lastName, rating, comment }
    ) => {
      console.log("helloCustomer");
      const updatedBusiness = await Business.findOneAndUpdate(
        { businessName },
        { $push: { customers: { firstName, lastName, rating, comment } } },
        { new: true }
      );

      return updatedBusiness;
    },
    updateCapacity: async (_, { currentCapacity }, context) => {
      if (context.user) {
        console.log("heys");
        const updatedCapacity = await Business.findByIdAndUpdate(
          { _id: context.user.id },
          { $set: { currentCapacity: currentCapacity } }
        );
        return updatedCapacity;
      }
    },

    clockinEmployee: async (_, { businessName }, context) => {
      if (context.user) {
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
  },
};

export default resolvers;

// write virtual
// wirite a update current capacity
