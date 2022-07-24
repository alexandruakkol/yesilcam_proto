import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { NativeBaseProvider, Center, HStack, View } from "native-base";
import React from "react";
import Card from "./Card";
import { useFonts, Jost_600SemiBold } from "@expo-google-fonts/jost";
import { LobsterTwo_700Bold_Italic } from "@expo-google-fonts/lobster-two";
import { store, retrieve } from "../storage";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

const bkgColor = "#ebecf0";

const Cards = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Jost_600SemiBold,
    LobsterTwo_700Bold_Italic,
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <NativeBaseProvider>
        <View style={styles.pageContainer}>
          <Header></Header>
          <Card></Card>
        </View>
        <Navbar></Navbar>
      </NativeBaseProvider>
    );
  }
};

export default Cards;

const styles = StyleSheet.create({
  pageContainer: {
    height: "94%",
    backgroundColor: bkgColor,
  },
});
