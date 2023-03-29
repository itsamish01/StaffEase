export default `
  type Query {
    Business: Business
    Employee: Employee
    BusinessAll: Business
  }
  type Mutation {
    loginBusiness(email: String!, password: String!): LoginAddBusinessResponse
    addBusiness(
      businessName: String!,
      email: String!,
      password:String!,
      description: String!,
      location:String!,
      contact:String!,
      currentCapacity:Int!,
      maxCapacity:Int!,
      employeeOnCount:Int!
    ): LoginAddBusinessResponse
    saveEmployee(firstName:String!, lastName:String!): Business
    clockinEmployee(businessName:String!):Business
    removeEmployee(employeeId: ID!): Business
    saveCustomer(firstName:String!, lastName:String!, rating:Int!, comment: String!):Business
    loginEmployee(email: String!, password: String!): LoginAddEmployeeResponse
    addEmployee(
      firstName: String!
      lastName: String!
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
    businessName: String!
    email: String!
    password:String!
    description: String!
    location: String!
    contact: String!
    currentCapacity: Int!
    maxCapacity: Int!
    employeeOnCount: Int!
    employees: [Employee]
    customers:[Customer]
  }
  type Employee {
    _id: ID!
    firstName: String!
    lastName: String!
    clockedin: Boolean
  }
  type Customer {
    _id:ID!
    firstName: String!
    lastName: String!
    rating: Int!
    comment: String!
  }
`;
