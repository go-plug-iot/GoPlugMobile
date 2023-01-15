import {createStackNavigator} from '@react-navigation/stack';
import {useAuth} from '../context/auth';

import AuthNavigator from './Auth';
import BottomTabs from './BottomTabs';

const Stack = createStackNavigator();
const auth = false;

const MainNavigator = () => {
  const authCtx = useAuth();
  return (
    <Stack.Navigator>
      {!!authCtx.authCredentials?.token ? (
        <Stack.Screen name="Main" component={BottomTabs} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;
