import { SecureStorageEnum } from '@/types/secureStorage.enum';
//Local Strorage
const setItem = (name: SecureStorageEnum, value: string) => {
  return localStorage.setItem(name, value);
};

const getItem = (name: SecureStorageEnum) => {
  return localStorage.getItem(name);
};

const removeItem = (name: SecureStorageEnum) => {
  return localStorage.removeItem(name);
};

const secureStorage = {
  setItem,
  getItem,
  removeItem
};

export default secureStorage;
