import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.login}>Login</Text>
          <TextInput placeholder="email" style={styles.textInput} />
          <TextInput
            placeholder="password"
            style={styles.textInput}
            textContentType="password"
            secureTextEntry
          />
          <View style={styles.btnContainer}>
            <Button
              title="login"
              color="white"
              onPress={() => navigation.navigate('Transfer')}
            />
          </View>
          <View style={styles.btnContainer}>
            <Button
              title="Sign Up"
              color="white"
              onPress={() => navigation.navigate('SignUp')}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
  },
  login: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'gray',
    marginTop: 12,
  },
});

export default Login;
