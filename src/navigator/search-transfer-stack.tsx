import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchTransfer from '../pages/search/transfer';

const Stack = createStackNavigator();

const SearchTransferStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name={'SearchTransfer'} component={SearchTransfer} />
    </Stack.Navigator>
  );
};

export default SearchTransferStackNavigator;
