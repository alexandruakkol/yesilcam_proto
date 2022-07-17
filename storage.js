import AsyncStorage from "@react-native-async-storage/async-storage";

export const store = async (obj) => {
  console.log('will store obj:',obj);
  try {
    for(key of Object.keys(obj)){console.log('key:value', key, obj[key]);
      await AsyncStorage.setItem(
        String(key),
        String(obj[key])
      );
      console.log(
        "stored ",
        String(key),
        String(obj[key])
      );
    }
   
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
