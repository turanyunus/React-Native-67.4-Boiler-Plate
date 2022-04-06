import React from 'react';
import { View, Dimensions, StyleSheet, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Text } from 'react-native-animatable';
import { colors } from '../themes/colors';
// @ts-ignore
import { splashLogo } from '../assets/icons';
import { size } from '../themes/fonts';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} />
      <View style={styles.header}>
        <Animatable.Image
          animation="bounce"
          duration={1500}
          source={splashLogo}
          style={styles.logo}
          resizeMode="stretch"
        />
        <Text style={styles.appName}>RN-0.67.4-Boiler-Plate App</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const { height } = Dimensions.get('screen');
const logo = height * 0.24;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: logo,
    height: logo
  },
  appName: {
    color: '#FFF',
    fontSize: size.font20,
    fontWeight: 'bold'
  }
});
