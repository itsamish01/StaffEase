import { gql } from "@apollo/client";

export const GET_RESTAURANTS = gql`
  query Query {
    Business {
      _id
      businessName
      description
      location
      contact
      currentCapacity
    }
  }
`;
