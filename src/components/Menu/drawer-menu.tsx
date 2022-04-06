import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import BottomTabNavigation from './bottom-tab-menu';
import { colors } from '../../themes/colors';
import { size } from '../../themes/fonts';
import metrics from '../../themes/metrics';
import LogInPage from '../../pages/auth/login';
import RegisterPage from '../../pages/auth/register';
import { useTranslation } from 'react-i18next';
import SearchList from '../../pages/search/search-list';
import { useNavigation } from '@react-navigation/native';
const Drawer = createDrawerNavigator();

interface CustomDrawerContentProps {
  navigation: any;
}

const CustomDrawerContent = (props: CustomDrawerContentProps) => {
  const { t } = useTranslation();
  return (
    <DrawerContentScrollView {...props}>
      {/* Appname'nin oldugu kısım */}
      <View style={styles.drawerItemStyle}>
        <Image source={require('../../assets/icons/splashlogo.png')} style={styles.appNameIcon} />
        <View style={styles.appNameText}>
          <Text style={styles.title}>RN-0.67.4-Boiler-Plate</Text>
          <Text style={styles.titleSub}>Search Hotel</Text>
        </View>
      </View>
      {/* Drawer'ın içindeki itemler */}
      <DrawerItem
        key={'Home'}
        label={() => <Text style={styles.drawerLabel}>{t('tab.Home')}</Text>}
        onPress={() => props.navigation.navigate('Home')}
        style={styles.drawerItem}
      />
      <DrawerItem
        key={'LogInPage'}
        label={() => <Text style={styles.drawerLabel}>{t('tab.Login')}</Text>}
        onPress={() => props.navigation.navigate('LogInPage')}
        style={styles.drawerItem}
      />
      <DrawerItem
        key={'RegisterPage'}
        label={() => <Text style={styles.drawerLabel}>{t('tab.Register')}</Text>}
        onPress={() => props.navigation.navigate('RegisterPage')}
        style={styles.drawerItem}
      />
    </DrawerContentScrollView>
  );
};

interface DrawNavigatorProps { }

const DrawNavigator = (props: DrawNavigatorProps) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: colors.primary,
          height: 50
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.headerLeft}>
            <Icon name="bars" size={20} color="#fff" />
          </TouchableOpacity>
        )
      })}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="HomeBottomTab"
        component={BottomTabNavigation}
        options={{
          title: 'RN-0.67.4-Boiler-Plate',
          headerTitle: () => (
            <View style={styles.headerTitle}>
              <Text style={styles.headerTitleText}>RN-0.67.4-Boiler-Plate</Text>
            </View>
          ),
          headerRight: () => (
            <View style={styles.headerRight}>
              <Icon name="bell" size={20} color="#fff" />
            </View>
          )
        }}
      />
      <Drawer.Screen
        name="LogInPage"
        component={LogInPage}
        options={{
          headerShown: false
        }}
      />
      <Drawer.Screen
        name="RegisterPage"
        component={RegisterPage}
        options={{
          headerShown: false
        }}
      />
      <Drawer.Screen
        name={'SearchList'}
        component={SearchList}
        options={{
          title: 'Search Results',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.headerLeft}
            >
              <IonIcon name="ios-arrow-back-outline" size={25} color="#fff" />
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            color: '#fff'
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => { }} style={styles.headerRight}>
              <Icon name="filter" size={25} color="#fff" />
            </TouchableOpacity>
          )
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerItemStyle: {
    flexDirection: 'row',
    marginLeft: metrics.screenHeight * 0.02,
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    marginBottom: 1,
    paddingBottom: metrics.screenHeight * 0.01
  },
  appNameIcon: {
    height: metrics.screenHeight * 0.1,
    width: metrics.screenHeight * 0.1,
    marginRight: metrics.screenHeight * 0.03,
    marginTop: metrics.screenHeight * 0.01
  },
  appNameText: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    color: '#666666',
    fontWeight: '700'
  },
  titleSub: {
    fontSize: 14
  },

  headerLeft: {
    marginLeft: 15
  },
  headerTitle: { display: 'flex', width: metrics.screenWidth - 100 },
  headerTitleText: { color: colors.white, fontSize: size.font18, fontWeight: '700', textAlign: 'center' },
  headerRight: {
    marginRight: 15
  },
  // drawer content
  drawerLabel: {
    fontSize: 14
  },
  drawerItem: {
    height: 50,
    justifyContent: 'center'
  }
});

export default DrawNavigator;
