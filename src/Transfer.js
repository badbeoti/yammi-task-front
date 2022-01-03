import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TextInput,
  Button,
} from 'react-native';

import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Transaction from './Transaction';
import {
  getLogin,
  getTransactions,
  getUsers,
  postSend,
  URL_TRANSACTIONS,
  URL_USERS,
} from './api';
import authSlice from './redux/reducer';

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
  const [usersList, setUsersList] = useState(0);
  const [nextUrl, setNextUrl] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRefresh, setIsRefresh] = React.useState(false);

  const [amount, setAmount] = useState(0);
  const [selectedId, setSelectedId] = useState(0);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userSelector = useSelector(state => state.authSlice, shallowEqual);

  useFocusEffect(
    React.useCallback(() => {
      handleLoad();
      setAmount(0);
      setSelectedId(0);

      refreshUser();
    }, []),
  );

  const refreshUser = async () => {
    const user = await getLogin();
    dispatch(authSlice.actions.setUser(user.data));
  };

  const init = async (url, refresh) => {
    try {
      const users = await getUsers(url);
      if (!refresh && usersList.length > 1) {
        setUsersList(prev => prev.concat(users.data.results));
      } else {
        setUsersList(users.data.results);
      }
      setNextUrl(users.data.next);
      setIsLoading(false);
      setIsRefresh(false);
    } catch (e) {
      setIsLoading(false);
      setIsRefresh(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(true);
    init(URL_USERS, true);
  };

  const handleRefresh = () => {
    setIsRefresh(true);
    init(URL_USERS, true);
  };

  const handleLoadMore = () => {
    if (nextUrl !== null && !isLoading && !isRefresh) {
      setIsLoading(true);
      init(nextUrl, false);
    }
  };

  const onPressToSend = async () => {
    const formData = new FormData();

    if (amount > 0 && selectedId !== 0) {
      formData.append('id_sender', userSelector.id);
      formData.append('id_receiver', selectedId);
      formData.append('amount', amount);

      try {
        await postSend(formData);
        navigation.navigate('Transaction');
      } catch (e) {
        console.log(e.response.error);
      }
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <Text
          style={styles.email(item.id === selectedId)}
          onPress={() => setSelectedId(item.id)}>
          {item.email}
        </Text>
        {/*<Text style={styles.balance}>{item.balance}</Text>*/}
      </View>
    );
  };

  return (
    <View style={styles.inner}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.login}>Transfer</Text>
        <View style={{flexDirection: 'row'}}>
          <Text>잔액: {userSelector.balance.toLocaleString('ko-KR')} 원</Text>
        </View>
        <Text
          style={{fontSize: 20}}
          onPress={() => navigation.navigate('Transaction')}>
          거래내역
        </Text>
      </View>
      <TextInput
        style={styles.textInput}
        value={amount}
        onChangeText={setAmount}
      />
      <FlatList
        data={usersList}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        onEndReachedThreshold={0.01}
        onEndReached={handleLoadMore}
        refreshing={isRefresh}
        onRefresh={handleRefresh}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.btnContainer}>
        <Button title="Send" color="white" onPress={onPressToSend} />
      </View>
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
    marginBottom: 4,
  },
  email: isSelected => ({
    fontSize: 24,
    marginVertical: 4,
    color: isSelected ? 'black' : 'gray',
  }),
  balance: {
    fontSize: 32,
  },
  btnContainer: {
    backgroundColor: 'gray',
    marginTop: 12,
  },
});

export default Transfer;
