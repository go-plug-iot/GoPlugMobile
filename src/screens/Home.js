import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {gql, useMutation, useSubscription} from '@apollo/client';
import {VStack, Box, Heading, Button} from 'native-base';
import {SWITCH_OFF, SWITCH_ON} from '../mutations';
import {SUBSCRIBE_SWITCH_STATUS} from '../subscription';

const Home = () => {
  const [turnOnSwitch, {on_data, on_loading, on_error}] =
    useMutation(SWITCH_ON);
  const [turnOffSwitch, {off_data, off_loading, off_error}] =
    useMutation(SWITCH_OFF);
  const {data: switch_1_data, loading: switch1_loading} = useSubscription(
    SUBSCRIBE_SWITCH_STATUS,
    {
      variables: {topic: 'SWITCH_1'},
    },
  );
  const {data: switch_2_data, loading: switch2_loading} = useSubscription(
    SUBSCRIBE_SWITCH_STATUS,
    {
      variables: {topic: 'SWITCH_2'},
    },
  );
  console.log(switch_1_data);
  return (
    <VStack space={3} justifyContent="center" alignItems="center">
      <Box w="300" rounded="md" shadow={3}>
        <Heading>Switch 1</Heading>
        <Text>Status: {switch_1_data?.isOn === 1 ? 'ON' : 'OFF'}</Text>
        <Button
          size="sm"
          variant="outline"
          onPress={() => turnOnSwitch({variables: {switchId: '1'}})}>
          On
        </Button>
        <Button
          size="sm"
          variant="outline"
          colorScheme="secondary"
          onPress={() => turnOffSwitch({variables: {switchId: '1'}})}>
          {' '}
          Off
        </Button>
        <TouchableOpacity>
          <Text>Hello</Text>
        </TouchableOpacity>
      </Box>
      <Box w="300" bg="primary.300" rounded="md" shadow={3}>
        <Heading>Switch 2</Heading>
        <Text>Status: {switch_2_data?.isOn === 1 ? 'ON' : 'OFF'}</Text>
        <Button
          size="sm"
          variant="outline"
          onPress={() => turnOnSwitch({variables: {switchId: '2'}})}>
          {' '}
          On
        </Button>
        <Button
          size="sm"
          variant="outline"
          colorScheme="secondary"
          onPress={() => turnOffSwitch({variables: {switchId: '2'}})}>
          Off
        </Button>
      </Box>
    </VStack>
  );
};

export default Home;
