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
import {CREATE_USER} from '../mutations';
import {useAuth} from '../context/auth';

const Signup = ({navigation}) => {
  const authCtx = useAuth();
  const [createUser, {data, loading, error}] = useMutation(CREATE_USER, {
    onCompleted: data => {
      authCtx.handleModifyToken(data.createUser.token);
    },
  });
  const handleSignup = async data => {
    try {
      const user = await auth().createUserWithEmailAndPassword(
        data.emailAddress,
        data.password,
      );
      if (user) {
        const firebaseToken = await authCtx.handleRetrieveFirebaseToken();
        await createUser({
          variables: {userDetails: {...data, firebaseToken}},
        });
      }
    } catch (err) {
      switch (err) {
        case 'auth/email-already-in-use':
          console.log('That email address is already in use!');
          break;
        case 'auth/invalid-email':
          console.log('That email address is invalid!');
          break;
        default:
          console.log(err);
      }
    }
  };

  const handleNavigateLogin = () => navigation.navigate('Login');

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
          Sign up to continue!
        </Heading>
        <LoginForm onSubmit={handleSignup} isSignup />
        <HStack mt="6" justifyContent="center">
          <Text
            fontSize="sm"
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}>
            Already a user.{' '}
          </Text>
          <Link
            _text={{
              color: 'indigo.500',
              fontWeight: 'medium',
              fontSize: 'sm',
            }}
            onPress={handleNavigateLogin}>
            Sign In
          </Link>
        </HStack>
      </Box>
    </Center>
  );
};

export default Signup;
