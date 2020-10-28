import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';


import {AuthContext} from './src/components/context';

import RootStackScreen from './src/navigation/RootStackScreen';

import AsyncStorage from '@react-native-community/async-storage';
import DrawerNavigator from "./src/navigation/DrawerNavigator";


const App = () => {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [token, settoken] = React.useState(null);

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    center_no: null,
    token: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          token: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          center_no: action.id,
          token: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          center_no: null,
          token: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          center_no: action.id,
          token: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async (foundUser) => {
      // settoken('fgkj');
      // console.log("jjjj: " + JSON.stringify(foundUser));
      const token = String(foundUser.token);
      const center_no = foundUser.center_no;

      try {
        await AsyncStorage.setItem('token', token);
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', token);
      dispatch({type: 'LOGIN', id: center_no, token: token});
    },
    signOut: async () => {
      // settoken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('token');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'LOGOUT'});
    },
    signUp: () => {
      // settoken('fgkj');
      // setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme(isDarkTheme => !isDarkTheme);
    }
  }), []);

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let token;
      token = null;
      try {
        token = await AsyncStorage.getItem('token');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: token});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large"/>
        </View>
    );
  }
  return (
      <PaperProvider theme={theme}>
        <AuthContext.Provider value={authContext}>
          <NavigationContainer theme={theme}>
            {loginState.token !== null ? (
                    <DrawerNavigator/>
                )
                :
                <RootStackScreen/>
            }
          </NavigationContainer>
        </AuthContext.Provider>
      </PaperProvider>
  );
};

export default App;
