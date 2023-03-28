/**
 * @file controllers/employee.js
 * @desc Controller for employees.
 */
import EmployeeModel from "../models/employee.js";

const controller = {
    index(){
        return EmployeeModel;
    }
};

export default controller;
