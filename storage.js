import AsyncStorage from "@react-native-async-storage/async-storage";

export const store = async (obj) => {
  try {
    await AsyncStorage.setItem(String(Object.keys(obj)), String(Object.values(obj)));
    console.log('stored ',String(Object.keys(obj)), String(Object.values(obj)))
  } catch (e) {
    console.log("asyncstorage write error", e);
  }
};

export const retrieve = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? value : null;
  } catch (e) {
    console.log("asyncstorage read error", e);
  }
};
