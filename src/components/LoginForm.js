import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
} from 'native-base';
import {useForm, Controller} from 'react-hook-form';

const LoginForm = ({onSubmit, isSignup = false}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
    },
  });
  return (
    <VStack space={3} mt="5">
      {isSignup && (
        <>
          <Text
            fontSize="sm"
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}>
            First Name
          </Text>
          <Controller
            control={control}
            rules={{
              required: isSignup,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                type="text"
              />
            )}
            name="firstName"
          />
          {errors.firstName && <Text>This is required.</Text>}
          <Text
            fontSize="sm"
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}>
            Last Name
          </Text>
          <Controller
            control={control}
            rules={{
              required: isSignup,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                type="text"
              />
            )}
            name="lastName"
          />
          {errors.lastName && <Text>This is required.</Text>}
        </>
      )}
      <Text
        fontSize="sm"
        color="coolGray.600"
        _dark={{
          color: 'warmGray.200',
        }}>
        Email address
      </Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            type=""
          />
        )}
        name="emailAddress"
      />
      {errors.emailAddress && <Text>This is required.</Text>}
      <Text
        fontSize="sm"
        color="coolGray.600"
        _dark={{
          color: 'warmGray.200',
        }}>
        Password
      </Text>
      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 7,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            type="password"
          />
        )}
        name="password"
      />
      {errors.password && <Text>{errors.password.message}</Text>}
      <Button
        mt="2"
        colorScheme="indigo"
        onPress={handleSubmit(onSubmit)}>
        Sign in
      </Button>
    </VStack>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSignup: PropTypes.bool,
};

export default LoginForm;
