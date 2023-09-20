export const setLocalStorageItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorageItem = (key: string) => {
  const savedItem = localStorage.getItem(key) || '[]';

  return JSON.parse(savedItem);
};
