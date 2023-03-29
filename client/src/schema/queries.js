import { gql } from "@apollo/client";

export const GET_RESTAURANTS = gql`
  query BusinessAll {
    BusinessAll {
      businessName
    }
  }
`;
