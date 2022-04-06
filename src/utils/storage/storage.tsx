import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE = {
  GET: (key: string) => AsyncStorage.getItem(key),
  SET: (key: string, data: any) => AsyncStorage.setItem(key, data),
  REMOVE: (key: string) => AsyncStorage.removeItem(key)
};
export const STORAGE_KEYS = {
  i18nextLng: 'i18nextLng',
  AccessToken: 'AccessToken',
  RefreshToken: 'RefreshToken'
};
