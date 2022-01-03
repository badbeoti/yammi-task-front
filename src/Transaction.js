import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {getTransactions, URL_TRANSACTIONS} from './api';
import moment from 'moment';

const Transaction = () => {
  const [transactionList, setTransactionList] = React.useState([]);
  const [nextUrl, setNextUrl] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRefresh, setIsRefresh] = React.useState(false);

  useEffect(() => {
    handleLoad();
  }, []);

  const init = async (url, refresh) => {
    try {
      const transactions = await getTransactions(url);
      if (!refresh && transactionList.length > 1) {
        setTransactionList(prev => prev.concat(transactions.data.results));
      } else {
        setTransactionList(transactions.data.results);
      }
      setNextUrl(transactions.data.next);
      setIsLoading(false);
      setIsRefresh(false);
    } catch (e) {
      setIsLoading(false);
      setIsRefresh(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(true);
    init(URL_TRANSACTIONS, true);
  };

  const handleRefresh = () => {
    setIsRefresh(true);
    init(URL_TRANSACTIONS, true);
  };

  const handleLoadMore = () => {
    if (nextUrl !== null && !isLoading && !isRefresh) {
      setIsLoading(true);
      init(nextUrl, false);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.item}>
        <Text>{index + 1}</Text>
        <View style={styles.column}>
          <Text>보낸 사람</Text>
          <Text style={styles.sender}>{item.id_sender}</Text>
        </View>
        <View style={styles.column}>
          <Text>받은 사람</Text>
          <Text style={styles.receiver}>{item.id_receiver}</Text>
        </View>
        <View style={styles.column}>
          <Text>금액</Text>
          <Text style={styles.amount}>
            {item.amount.toLocaleString('ko-KR')} 원
          </Text>
        </View>
        <View style={styles.column}>
          <Text>일자</Text>
          <Text style={styles.amount}>
            {moment(item.creation_date).format('YY.MM.DD HH:mm')}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.screenWrapper}>
      <FlatList
        data={transactionList}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        onEndReachedThreshold={0.01}
        onEndReached={handleLoadMore}
        refreshing={isRefresh}
        onRefresh={handleRefresh}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 4,
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 36,
    marginHorizontal: 8,
  },
});
