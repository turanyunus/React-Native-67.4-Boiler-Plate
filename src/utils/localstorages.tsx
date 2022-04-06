// @ts-ignore
import AsyncStorage from '@react-native-async-storage/async-storage';

// ACCESS_TOKEN
export const getAccessToken = async () => {
  return await AsyncStorage.getItem('ACCESS_TOKEN');
};

export const setAccessToken = async (value: any) => {
  return await AsyncStorage.setItem('ACCESS_TOKEN', value);
};

export const removeAccessToken = async () => {
  return await AsyncStorage.removeItem('ACCESS_TOKEN');
};

// IS_SELECTED_CATEGORY
export const getSelectedCategory = async () => {
  return await AsyncStorage.getItem('IS_SELECTED_CATEGORY');
};

export const setSelectedCategory = async (value: any) => {
  return await AsyncStorage.setItem('IS_SELECTED_CATEGORY', value);
};

export const removeSelectedCategory = async () => {
  return await AsyncStorage.removeItem('IS_SELECTED_CATEGORY');
};

// USER_ROLE
export const getUserRole = async () => {
  return await AsyncStorage.getItem('USER_ROLE');
};

export const setUserRole = async (value: any) => {
  return await AsyncStorage.setItem('USER_ROLE', value);
};

export const removeUserRole = async () => {
  return await AsyncStorage.removeItem('USER_ROLE');
};

export const removeAllItems = async () => {
  return await AsyncStorage.clear();
};
