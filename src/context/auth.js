import React, {
  createContext,
  useEffect,
  useContext,
  useState,
  useCallback,
} from 'react';

import auth from '@react-native-firebase/auth';
import {storage} from '../utils/storage';

const AuthContext = createContext();

// const authReducer = (state, action) => {
//   switch (action.type) {
//     case 'login': {
//       return {count: state.count + 1};
//     }
//     case 'signup': {
//       return {count: state.count - 1};
//     }
//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`);
//     }
//   }
// };
const AuthProvider = ({children}) => {
  //const [state, dispatch] = useReducer(authReducer, {user: {}});
  const [user, setUser] = useState();
  const [authCredentials, setAuthCredentials] = useState();

  const onAuthStateChanged = useCallback(userDetails => {
    //console.log(userDetails);
    setUser(userDetails);
  }, []);

  const handleModifyToken = useCallback(token => {
    if (token) {
      storage.set('user.token', token);
    } else {
      storage.delete('user.token');
    }
    setAuthCredentials(prev => ({...prev, token}));
  }, []);

  const handleRetrieveFirebaseToken = async () =>
    await auth().currentUser.getIdToken();

  const handleSignOutUser = async () => {
    await auth().signOut();
    handleModifyToken(null);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    const token = storage.getString('user.token');
    handleModifyToken(token);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        handleModifyToken,
        handleSignOutUser,
        handleRetrieveFirebaseToken,
        authCredentials,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be within AuthProvider');
  }
  return context;
};

export {AuthProvider, useAuth};
