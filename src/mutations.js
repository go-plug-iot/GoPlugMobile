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

export {SWITCH_ON, SWITCH_OFF};
