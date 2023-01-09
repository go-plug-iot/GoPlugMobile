import {View} from 'react-native';
import {Heading, Text} from 'native-base';

const Settings = () => {
  return (
    <View>
      <Heading>
        This is <Heading color="emerald.400">Settings Screen</Heading>
      </Heading>
      <Text pt="3">
        NativeBase is a simple, modular and accessible component library that
        gives you building blocks to build you React applications.
      </Text>
    </View>
  );
};

export default Settings;
