import { STORAGE, STORAGE_KEYS } from './storage';

export const STORAGE_MANAGE = {
  accessToken: {
    get: () => `Bearer ${STORAGE.GET(STORAGE_KEYS.AccessToken)}`,
    set: (token: string) => STORAGE.SET(STORAGE_KEYS.AccessToken, token),
    remove: () => STORAGE.REMOVE(STORAGE_KEYS.AccessToken)
  }
};
