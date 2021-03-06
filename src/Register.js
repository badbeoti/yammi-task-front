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
import {postRegister} from './api';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const Register = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordSec, setPasswordSec] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      setEmail('');
      setPassword('');
      setPasswordSec('');
    }, []),
  );

  const signUp = async () => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password2', passwordSec);

    try {
      const register = await postRegister(formData);

      console.log(register.data);

      navigation.navigate('Login');
    } catch (e) {
      console.log(e.response.data);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.login}>Sign Up</Text>
          <TextInput
            placeholder="email"
            style={styles.textInput}
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            placeholder="password"
            style={styles.textInput}
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <TextInput
            placeholder="password2"
            style={styles.textInput}
            secureTextEntry
            value={passwordSec}
            onChangeText={text => setPasswordSec(text)}
          />
          <View style={styles.btnContainer}>
            <Button title="Submit" color="white" onPress={signUp} />
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

export default Register;
