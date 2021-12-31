import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, FlatList, TextInput} from 'react-native';

import {useNavigation} from '@react-navigation/native';

const DATA = [
  {
    id: 1,
    email: 'test@test.com',
    balance: 500,
  },
  {
    id: 2,
    email: 'test2@test.com',
    balance: 12500,
  },
  {
    id: 3,
    email: 'test3@test.com',
    balance: 1000,
  },
];

const Transfer = () => {
  const [amount, setAmount] = useState(0);
  const navigation = useNavigation();

  // useEffect(() => {
  //   console.log(Number(amount).toLocaleString('en'));
  //   setAmount(prev =>
  //     typeof prev === 'string' ? Number(prev).toLocaleString('en') : prev,
  //   );
  // }, [amount]);

  const renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <Text style={styles.email}>{item.email}</Text>
        <Text style={styles.balance}>
          {item.balance.toLocaleString('ko-KR')}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.inner}>
      <Text style={styles.login}>Transfer</Text>
      <TextInput
        style={styles.textInput}
        value={Number(amount)}
        onChangeText={setAmount}
      />
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
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
    height: 24,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 24,
  },
  item: {
    padding: 8,
    marginVertical: 8,
  },
  email: {
    fontSize: 24,
    marginBottom: 8,
  },
  balance: {
    fontSize: 32,
  },
});

export default Transfer;
