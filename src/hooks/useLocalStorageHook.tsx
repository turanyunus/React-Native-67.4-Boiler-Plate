import { useState } from 'react';
// @ts-ignore
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useLocalStorageHook = async (key: string, value: string) => {
  const [state, setState] = useState(async () => {
    const storage = await AsyncStorage.getItem(key);
    return storage ? storage : value;
  });

  const updateStorage = async (value: any) => {
    await AsyncStorage.setItem(key, value);
    setState(value);
  };

  return [state, updateStorage];
};
