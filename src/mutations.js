import {gql} from '@apollo/client';

const SWITCH_ON = gql`
  mutation TurnOnSwitch($switchId: String!) {
    turnOnSwitch(switchId: $switchId) {
      code
    }
  }
`;

const SWITCH_OFF = gql`
  mutation TurnOffSwitch($switchId: String!) {
    turnOffSwitch(switchId: $switchId) {
      code
    }
  }
`;

const AUTHENTICATE_USER = gql`
  mutation Mutation($emailAddress: String!, $firebaseToken: String!) {
    authenticateUser(
      emailAddress: $emailAddress
      firebaseToken: $firebaseToken
    ) {
      code
      message
      success
      token
    }
  }
`;

const CREATE_USER = gql`
  mutation Mutation($userDetails: CreateUserInput) {
    createUser(userDetails: $userDetails) {
      code
      message
      success
      token
    }
  }
`;

export {AUTHENTICATE_USER, CREATE_USER, SWITCH_ON, SWITCH_OFF};
