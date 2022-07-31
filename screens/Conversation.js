import { StyleSheet, Text } from "react-native";
import { NativeBaseProvider, Center, View } from "native-base";
import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { useEffect } from "react";
import { getConversation } from "../firebase";

const bkgColor = "#ebecf0";

const Conversation = ({ navigation, route }) => {
  const convo = route.params.convo;

  useEffect(() => {
    console.log(convo);
    //getConversation();
  }, []);

  return (
    <NativeBaseProvider>
      <View style={styles.pageContainer}>
        <Header />
        <Text>{convo}</Text>
      </View>
      <Navbar navigation={navigation}></Navbar>
    </NativeBaseProvider>
  );
};

export default Conversation;

const styles = StyleSheet.create({
  pageContainer: {
    height: "94%",
    backgroundColor: bkgColor,
  },
});
