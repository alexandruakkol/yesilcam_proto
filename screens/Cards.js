import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { NativeBaseProvider, Center, HStack, View } from "native-base";
import React from "react";
import Card from "./Card";
import { useFonts, Jost_600SemiBold } from "@expo-google-fonts/jost";
import { LobsterTwo_700Bold_Italic } from "@expo-google-fonts/lobster-two";
import { store, retrieve } from "../storage";

const headerColor = "white";
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
          <HStack style={styles.header} space={12} justifyContent="center">
            <Center h="10" w="15%" />
            <Center h="10" w="70%">
              <Text style={[styles.headerTitle, styles.headerElements]}>
                Green Pine Connects
              </Text>
            </Center>
            <Center h="10" w="15%" />
          </HStack>

          <Card></Card>
        </View>
        <View style={styles.navbar}>
          <HStack space={1} justifyContent="center">
            <TouchableWithoutFeedback onPress={() => navigation.navigate('communityScreen')}>
        
              <View style={styles.navButton} w="45%" rounded="md" shadow={3}>
                <Center>Community</Center>
              </View>
            </TouchableWithoutFeedback>

            <View style={styles.navButton} w="45%" rounded="md" shadow={3}>
              <Center>Chat</Center>
            </View>
          </HStack>
        </View>
      </NativeBaseProvider>
    );
  }
};

export default Cards;

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: bkgColor,
    height: "90%",
  },

  header: {
    paddingTop: 50,
    backgroundColor: headerColor,
    height: 100,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    marginBottom: -50,
  },

  headerElements: { fontWeight: "bold" },
  headerTitle: {
    fontFamily: "LobsterTwo_700Bold_Italic",
    fontSize: 25,
    color: "darkgreen",
  },
  navbar: {
    height: "10%",
    backgroundColor: "lightgrey",
  },
  navButton: {
    borderWidth: "1",
    height: "300%",
  },
});
