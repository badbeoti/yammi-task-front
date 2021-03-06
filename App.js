/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import 'react-native-gesture-handler';

import RootStack from './src/RootStack';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App: () => Node = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar />
        <RootStack />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;
