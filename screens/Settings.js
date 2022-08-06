import { StyleSheet, Text } from "react-native";
import { NativeBaseProvider, Center, View, Button } from "native-base";
import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { auth } from "../firebase";

const bkgColor = "#ebecf0";

const Settings = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <View style={styles.pageContainer}>
        <Header />
        <Button
          onPress={() => {
            auth
              .signOut()
              .then(() => {
                console.log("user successfuly signed out");
                navigation.navigate("LoginScreen");
              })
              .catch(function (error) {
                console.log("sign-out error", error);
              });
          }}
        >
          Log out
        </Button>
      </View>
      <Navbar navigation={navigation}></Navbar>
    </NativeBaseProvider>
  );
};

export default Settings;

const styles = StyleSheet.create({
  pageContainer: {
    height: "94%",
    backgroundColor: bkgColor,
  },
});
