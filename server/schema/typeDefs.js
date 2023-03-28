const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    Business: Business
    Employee: Employee
  }
  type Mutation {
    loginBusiness(email: String!, password: String!): LoginAddBusinessResponse
    addBusiness(
      businessname: String!
      email: String!
      password: String!
    ): LoginAddBusinessResponse
    saveEmployee(employeeData: EmployeeInput!): Business
    clockinEmployee(clockedin:Boolean):Business
    removeEmployee(employeeId: ID!): Business
    saveCustomer(customerData:CustomerInput!):Business
    loginEmployee(email: String!, password: String!): LoginAddemployeeResponse
    addEmployee(
      businessname: String!
      email: String!
      password: String!
    ): LoginAddEmployeeResponse
  }
  type LoginAddBusinessResponse {
    token: ID!
  }
  type LoginAddEmployeeResponse {
    token: ID!
  }
  type Business {
    _id: ID!
    businessname: String!
    email: String!
    description: String!
    location: String!
    contact: String!
    current_capacity: INT!
    max_capacity: INT!
    employeeOnCount: Int!
    employees: [Employee]
    customers:[Customer]
  }
  type Employee {
    employeeId: ID!
    firstname: String!
    lastname: String!
    title: String!
    clockedin: Boolean
  }
  type Customer {
    cusomterId:ID!
    firstname: String!
    lastname: String!
    rating: INT!
    comment: String!
  }
  input EmployeeInput {
    firstname: String!
    lastname: String!
    title: String!
  }
  input CustomerInput {
    firstname: String!
    lastname: String!
    rating: INT!
    comment: String!
  }
`;

module.exports = typeDefs;