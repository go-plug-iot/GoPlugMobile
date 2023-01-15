/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider, Box} from 'native-base';
import React from 'react';
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
import {getMainDefinition} from '@apollo/client/utilities';
import {createClient} from 'graphql-ws';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {SafeAreaView, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import BottomTabs from './src/navigator/BottomTabs';
import MainNavigator from './src/navigator/MainNavigator';
import {AuthProvider} from './src/context/auth';
import {storage} from './src/utils/storage';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const httpLink = new HttpLink({
    uri: 'https://9b8d-202-170-60-245.ap.ngrok.io/graphql',
  });

  const wsLink = new GraphQLWsLink(
    createClient({
      url: 'ws://9b8d-202-170-60-245.ap.ngrok.io/subscriptions',
    }),
  );

  const authLink = setContext((_, {headers}) => {
    // get the authentication token from local storage if it exists
    const token = storage.getString('user.token');
    console.log(token);
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `${token}` : '',
      },
    };
  });

  const splitLink = split(
    ({query}) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );
  const client = new ApolloClient({
    link: authLink.concat(splitLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <NativeBaseProvider>
        <NavigationContainer>
          <AuthProvider>
            <MainNavigator />
          </AuthProvider>
        </NavigationContainer>
      </NativeBaseProvider>
    </ApolloProvider>
  );
};

export default App;
