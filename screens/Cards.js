import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import {
  NativeBaseProvider,
  Input,
  Center,
  TextArea,
  VStack,
  Image,
  HStack,
  Button,
  Text,
  View,
} from "native-base";
import React from "react";
import {
  LobsterTwo_700Bold_Italic,
  useFonts,
} from "@expo-google-fonts/lobster-two";
import { Card } from "./Card";

const headerColor = "beige";
const bkgColor = "white";

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
            <Center h="10" w="15%" rounded="md" />
            <Center h="10" w="70%" rounded="md">
              <Text style={[styles.headerTitle, styles.headerElements]}>
                Green Pine Connects
              </Text>
            </Center>
            <Center h="10" w="15%" rounded="md" />
          </HStack>
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
  header: { backgroundColor: headerColor, height: 45 },
  headerElements: { fontWeight: "bold" },
  headerTitle: {
    fontFamily: "LobsterTwo_700Bold_Italic",
    fontSize: 25,
    color: "darkgreen",
  },
});
