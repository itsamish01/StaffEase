import { gql } from "@apollo/client";

export const GET_RESTAURANTS = gql`
  query BusinessAll {
    BusinessAll {
      _id
      businessName
      description
      location
      contact
      customers {
        rating
        comment
      }
    }
  }
`;
