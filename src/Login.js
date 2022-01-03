import React, {useState} from 'react';
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

import {useDispatch, useSelector} from 'react-redux';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {getLogin, postToken} from './api';
import authSlice from './redux/reducer';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      setEmail('');
      setPassword('');
    }, []),
  );

  const login = async () => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const token = await postToken(formData);

    dispatch(authSlice.actions.setToken(token.data.access));

    const user = await getLogin();
    dispatch(authSlice.actions.setUser(user.data));

    navigation.navigate('Transfer');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.login}>Login</Text>
          <TextInput
            placeholder="email"
            style={styles.textInput}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            placeholder="password"
            style={styles.textInput}
            textContentType="password"
            secureTextEntry
            onChangeText={text => setPassword(text)}
          />
          <View style={styles.btnContainer}>
            <Button title="login" color="white" onPress={login} />
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
