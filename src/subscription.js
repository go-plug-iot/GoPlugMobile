import {gql} from '@apollo/client';

const SUBSCRIBE_SWITCH_STATUS = gql`
  subscription Subscribe2switch($topic: String!) {
    subscribe2switch(topic: $topic) {
      isOn
    }
  }
`;

export {SUBSCRIBE_SWITCH_STATUS};
