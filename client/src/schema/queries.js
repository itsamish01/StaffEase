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
export const GET_ME = gql`
  query Business {
    Business {
      businessName
      currentCapacity
      maxCapacity
      employeeOnCount
      employees {
        firstName
        lastName
        clockedin
        _id
      }
      customers {
        firstName
        lastName
        rating
        comment
      }
    }
  }
`;
export const API = gql`
  query API {
    API {
      session
    }
  }
`;
