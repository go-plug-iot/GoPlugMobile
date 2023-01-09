import {View} from 'react-native';
import {Heading, Text} from 'native-base';

const Statistics = () => {
  return (
    <View>
      <Heading>
        This is <Heading color="emerald.400">Statistics Screen</Heading>
      </Heading>
      <Text pt="3">
        NativeBase is a simple, modular and accessible component library that
        gives you building blocks to build you React applications.
      </Text>
    </View>
  );
};

export default Statistics;
