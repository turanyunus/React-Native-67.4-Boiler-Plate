import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
const Tab = createMaterialBottomTabNavigator();
import HomeStackNavigator from '../../navigator/home-stack';
import BookStackNavigator from '../../navigator/book-stack';
import { colors } from '../../themes/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';
import SearchTopBar from './search-top-menu';

const BottomTabNavigator = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      initialRouteName={'SearchTab'}
      barStyle={{
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.gray
      }}
      labeled={true}
      shifting={false}
    >
      <Tab.Screen
        name={'SearchTab'}
        component={SearchTopBar}
        options={{
          tabBarIcon: ({ focused }) => <Icon name="search" size={25} color={focused ? colors.primary : colors.black} />,
          title: t('tab.Search')
        }}
      />
      <Tab.Screen
        name={'HomeTab'}
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => <Icon name="home" size={25} color={focused ? colors.primary : colors.black} />,
          title: t('tab.Home')
        }}
      />

      <Tab.Screen
        name={'BookTab'}
        component={BookStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => <Icon name="book" size={25} color={focused ? colors.primary : colors.black} />,
          title: t('tab.Book')
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
