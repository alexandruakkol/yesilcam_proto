import { StyleSheet, Text } from "react-native";
import { NativeBaseProvider, Center, View } from "native-base";
import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import ConversationSlice from "../components/ConversationSlice";
const bkgColor = "#ebecf0";

const Chat = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <View style={styles.pageContainer}>
        <Header />
        <ConversationSlice></ConversationSlice>
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

  convserationSlice: {
    view: {},
  },
});
