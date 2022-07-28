import { StyleSheet, Text } from "react-native";
import { NativeBaseProvider, Center, View } from "native-base";
import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

const bkgColor = "#ebecf0";

const Chat = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <View style={styles.pageContainer}>
        <Header />
      </View>
      <Navbar navigation={navigation}></Navbar>
    </NativeBaseProvider>
  );
};

export default Chat;

const styles = StyleSheet.create({
  pageContainer: {
    height: "94%",
    backgroundColor: bkgColor,
  },
});
