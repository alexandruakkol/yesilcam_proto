import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, } from "react-native";
import {
  NativeBaseProvider,
  Center,
  HStack,

  View,
} from "native-base";
import React from "react";
import {
  LobsterTwo_700Bold_Italic,
  useFonts,
} from "@expo-google-fonts/lobster-two";
import Card from "./Card";

const headerColor = "white";
const bkgColor = "#ebecf0";

const Cards = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
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
          <HStack style={styles.header} space={12} justifyContent="center">
            <Center h="10" w="15%"/>
            <Center h="10" w="70%">
              <Text style={[styles.headerTitle, styles.headerElements]}>
                Green Pine Connects
              </Text>
            </Center>
            <Center h="10" w="15%"/>
          </HStack>

          <Card></Card>
        </View>
      </NativeBaseProvider>
    );
  }
};

export default Cards;

const styles = StyleSheet.create({

  pageContainer: {
    flex: 1,
    backgroundColor: bkgColor,
  },
  
  header: {
    paddingTop: 50,
    backgroundColor: headerColor,
    height: 100,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    marginBottom: -50
  },

  headerElements: { fontWeight: "bold" },
  headerTitle: {
    fontFamily: "LobsterTwo_700Bold_Italic",
    fontSize: 25,
    color: "darkgreen",
  },
});
