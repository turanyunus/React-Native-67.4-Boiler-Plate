import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Book from '../pages/book';

const Stack = createStackNavigator();

const BookStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name={'Book'} component={Book} />
    </Stack.Navigator>
  );
};

export default BookStackNavigator;
