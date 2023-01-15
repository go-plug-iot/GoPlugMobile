import {gql} from '@apollo/client';

const GET_USER = gql`
  query GetUser {
    getUser {
      id
      emailAddress
      firstName
      isAdmin
      lastName
    }
  }
`;

export {GET_USER};
