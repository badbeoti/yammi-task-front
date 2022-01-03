import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Login from './Login';
import Register from './Register';
import Transfer from './Transfer';
import Transaction from './Transaction';

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={Register} />
        <Stack.Screen name="Transfer" component={Transfer} />
        <Stack.Screen name="Transaction" component={Transaction} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
