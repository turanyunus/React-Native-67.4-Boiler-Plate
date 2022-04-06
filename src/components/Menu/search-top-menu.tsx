import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SearchTransferStackNavigator from '../../navigator/search-transfer-stack';
import SearchTourStackNavigator from '../../navigator/search-tour-stack';
import { useTranslation } from 'react-i18next';
const TopTab = createMaterialTopTabNavigator();

const SearchTopBar = () => {
  const { t } = useTranslation();

  return (
    <TopTab.Navigator>
      <TopTab.Screen
        name="SearchTabTransfer"
        component={SearchTransferStackNavigator}
        options={{
          tabBarLabel: t('tab.Transfer'),
          tabBarLabelStyle: {
            textTransform: 'capitalize',
            fontSize: 17
          }
        }}
      />
      <TopTab.Screen
        name="SearchTabTour"
        component={SearchTourStackNavigator}
        options={{
          tabBarLabel: t('tab.Tour'),
          tabBarLabelStyle: {
            textTransform: 'capitalize',
            fontSize: 17
          }
        }}
      />
    </TopTab.Navigator>
  );
};

export default SearchTopBar;
