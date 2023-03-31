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
