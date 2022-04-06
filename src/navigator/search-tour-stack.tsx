import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchTour from '../pages/search/tour';

const Stack = createStackNavigator();

const SearchTourStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name={'SearchTour'} component={SearchTour} />
    </Stack.Navigator>
  );
};

export default SearchTourStackNavigator;
