import { gql } from "@apollo/client";

export const ADD_BUSINESS = gql`
  mutation AddBusiness(
    $businessName: String!
    $email: String!
    $password: String!
    $description: String!
    $location: String!
    $contact: String!
    $maxCapacity: Int!
  ) {
    addBusiness(
      businessName: $businessName
      email: $email
      password: $password
      description: $description
      location: $location
      contact: $contact
      maxCapacity: $maxCapacity
    ) {
      token
    }
  }
`;

export const ADD_EMPLOYEE = gql`
  mutation Mutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addEmployee(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
    }
  }
`;
export const LOGIN_BUSINESS = gql`
  mutation LoginBusiness($email: String!, $password: String!) {
    loginBusiness(email: $email, password: $password) {
      token
    }
  }
`;
export const LOGIN_EMPLOYEE = gql`
  mutation LoginEmployee($email: String!, $password: String!) {
    loginEmployee(email: $email, password: $password) {
      token
    }
  }
`;
export const SAVE_EMPLOYEE = gql`
  mutation SaveEmployee($firstName: String!, $lastName: String!) {
    saveEmployee(firstName: $firstName, lastName: $lastName) {
      _id
    }
  }
`;
export const REMOVE_EMPLOYEE = gql`
  mutation RemoveEmployee($employeeId: ID!) {
    removeEmployee(employeeId: $employeeId) {
      _id
    }
  }
`;
export const SAVE_REVIEW = gql`
  mutation SaveCustomer(
    $businessName: String!
    $firstName: String!
    $lastName: String!
    $rating: Int!
    $comment: String!
  ) {
    saveCustomer(
      businessName: $businessName
      firstName: $firstName
      lastName: $lastName
      rating: $rating
      comment: $comment
    ) {
      _id
    }
  }
`;
