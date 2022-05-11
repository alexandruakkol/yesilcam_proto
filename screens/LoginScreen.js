import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { NativeBaseProvider, Input, Button, KeyboardAvoidingView } from "native-base";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";

const LoginScreen = () => {

  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return <View />;
} 
else {

    return (
      <NativeBaseProvider >
        <KeyboardAvoidingView behaviour="padding" style={styles.loginpage}>
          <Text style={styles.title}>Green Pine Connects</Text>
          <Input style={styles.input} size="2xl" placeholder="email"></Input>
          <Input secureTextEntry style={styles.input} placeholder="password"></Input>
        <Button>Login</Button>
        </KeyboardAvoidingView>
      </NativeBaseProvider>
    );
  }
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginpage: {
    backgroundColor: "seagreen",
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center",
  },
  title: {
    fontFamily: "Inter_900Black",
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center",
    fontSize: 35,
    marginBottom:200,
    color:'beige',
  },

  input: {},
});
