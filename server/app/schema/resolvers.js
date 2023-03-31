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
    /**
     * @func addBusiness
     * @desc Sign up (create) a new Business User
     * @todo Rename this to "createBusiness"
     * @param {*} _
     * @param {*} args
     * @returns {object} JWT token?
     */
    addBusiness: async (_, args) => {
      console.log("addBusiness");
      const business = await Business.create(args);
      const token = await business.authenticate(args.password);
      return { token };
    },
    /**
     * @func loginBusiness
     * @desc Login an existing Business user
     * @param {*} _
     * @param {object} param1
     * @returns {object}  JWT Token? and a business
     */
    loginBusiness: async (_, { email, password }) => {
      console.log("loginBusiness");
      const business = await Business.findOne({ email });
      if (!business) {
        throw new Error("Incorrect credentials");
      }
      const token = business?.authenticate(password);
      return { token, business };
    },
    /**
     * @func addEmployee
     * @desc Sign up (create) a new Employee user.
     * @todo rename this to "createEmployee"
     * @param {*} _
     * @param {*} args
     * @returns {object} JWT Token?
     */
    addEmployee: async (_, args) => {
      console.log("addEmployee");
      const employee = await Employee.create(args);
      const token = await employee.authenticate(args.password);
      return { token };
    },
    /**
     * @func loginEmployee
     * @desc Log in an existing Employee user
     * @param {*} _
     * @param {object} param1
     * @returns {object} JWT Token? and an employee
     */
    loginEmployee: async (_, { email, password }) => {
      console.log("loginEmployee");
      const employee = await Employee.findOne({ email });
      if (!employee) {
        throw new Error("Incorrect credentials");
      }
      const token = employee?.authenticate(password);
      return { token, employee };
    },
    /**
     * @func saveEmployee
     * @desc update a Business by adding an Employee to the list of employees.
     * @todo rename this to "addEmployee"
     * @param {*} _
     * @param {object} param1
     * @param {*} context
     * @returns {*} updatedBusiness
     */
    saveEmployee: async (_, { firstName, lastName }, context) => {
      console.log("saveEmployee");
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
    /**
     * @func removeEmployee
     * @desc update a Business by removing an Employee from the list of employees.
     * @param {*} _
     * @param {object} param1
     * @param {*} context
     * @returns updatedBusiness
     */
    removeEmployee: async (_, { employeeId }, context) => {
      if (context.user) {
        console.log("removeEmployee");
        const updatedBusiness = await Business.updateOne(
          { _id: context.user.id },
          { $pull: { employees: { _id: employeeId } } }
        );
        return updatedBusiness;
      }
      throw new Error("You need to be logged in!");
    },
    /**
     * @func saveReview
     * @desc Save (create) a Review of a Business.
     * @note This method was formerly called saveCustomer
     * @todo rename this again to "addReview" or "createReview"
     * @param {*} _
     * @param {*} param1
     * @param {*} context
     * @returns updatedBusiness
     */
    saveReview: async (
      _,
      { firstName, lastName, rating, comment },
      context
    ) => {
      console.log("saveReview");
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
    /**
     * @func clockInEmployee
     * @desc Clock In/Out an Employee
     * @todo Shouldn't there be two methods to clock in and clock out an employee? Also timestamps!
     * @param {*} _
     * @param {*} param1
     * @param {*} context
     * @returns updatedEmployee
     */
    clockInEmployee: async (_, { businessName }, context) => {
      console.log("clockInEmployee");
      if (context.user) {
        // TODO: If I reuse employee, consider using let instead of const
        const employee = await Employee.findById({ _id: context.user.id });
        let clockBoolean = employee.clockedIn;
        clockBoolean = !clockBoolean;

        const business = await Business.findOne({ businessName });
        business.employees.id(context.user.id).clockedin = clockBoolean;
        await business.save();
        // TODO: Can I just reuse employee
        // TODO: timestamps
        const updatedEmployee = await Employee.findByIdAndUpdate(
          { _id: context.user.id },
          { $set: { clockedIn: clockBoolean } }
        );
        // We should be returning the employee not the business here.
        // return assocBusiness;
        return updatedEmployee;
      }

      throw new Error("You need to be logged in!");
    },
    // TODO: write virtual
    // TODO: write a update current capacity
    /*
    currentCapacity: async (_, { businessName }. context) => {
      throw new Error("You need to be logged in!");
    }
    */
  },
};

export default resolvers;
