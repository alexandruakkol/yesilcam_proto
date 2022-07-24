import { StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { NativeBaseProvider, Center, HStack, View } from "native-base";
import React from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

const bkgColor = "#ebecf0";

const Cards = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <View style={styles.pageContainer}>
        <Header></Header>
        <Card></Card>
      </View>
      <Navbar></Navbar>
    </NativeBaseProvider>
  );
};

export default Cards;

const styles = StyleSheet.create({
  pageContainer: {
    height: "94%",
    backgroundColor: bkgColor,
  },
});
