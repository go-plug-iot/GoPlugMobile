import * as React from 'react';
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
} from 'native-base';
import auth from '@react-native-firebase/auth';
import {useMutation} from '@apollo/client';

import LoginForm from '../components/LoginForm';
import {useAuth} from '../context/auth';
import {AUTHENTICATE_USER} from '../mutations';

const Login = ({navigation}) => {
  const authCtx = useAuth();
  const [
    authenticateUser,
    {
      data: authenticationResult,
      loading: isAuthenticating,
      error: onAuthenticationError,
    },
  ] = useMutation(AUTHENTICATE_USER, {
    onCompleted: data => {
      authCtx.handleModifyToken(data.authenticateUser.token);
    },
  });
  const handleLogin = async data => {
    try {
      const user = await auth().signInWithEmailAndPassword(
        data.emailAddress,
        data.password,
      );
      if (user) {
        const firebaseToken = await authCtx.handleRetrieveFirebaseToken();
        await authenticateUser({
          variables: {emailAddress: data.emailAddress, firebaseToken},
        });
        //console.log(authenticationResult.authenticateUser?.token);
        //authCtx.handleModifyToken();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleNavigateSignup = () => navigation.navigate('Signup');

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}>
          Welcome
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: 'warmGray.200',
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs">
          Sign in to continue!
        </Heading>
        <LoginForm onSubmit={handleLogin} />
        <HStack mt="6" justifyContent="center">
          <Text
            fontSize="sm"
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}>
            I'm a new user.{' '}
          </Text>
          <Link
            _text={{
              color: 'indigo.500',
              fontWeight: 'medium',
              fontSize: 'sm',
            }}
            onPress={handleNavigateSignup}>
            Sign Up
          </Link>
        </HStack>
      </Box>
    </Center>
  );
};

export default Login;
