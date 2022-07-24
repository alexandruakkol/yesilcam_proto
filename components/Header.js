import { StyleSheet, Text } from "react-native";
import React from "react";
import { NativeBaseProvider, Center, HStack, View } from "native-base";
import {
  useFonts,
  LobsterTwo_700Bold_Italic,
} from "@expo-google-fonts/lobster-two";
import { useRoute } from "@react-navigation/native";

const headerColor = "white";

const Header = () => {
  const route = useRoute();
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
      <HStack style={styles.header} space={12} justifyContent="center">
        <Center h="10" w="70%">
          <Text style={[styles.headerTitle, styles.headerElements]}>
            Green Pine Connects
          </Text>
          <Text style={[styles.headerSubTitle, styles.headerElements]}>
            {route.name === "Cards" ? "" : route.name}
          </Text>
        </Center>
      </HStack>
    );
  }
};

export default Header;

const styles = StyleSheet.create({
  header: {
    paddingTop: 25,
    backgroundColor: headerColor,
    height: 75,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },
  headerElements: { fontWeight: "bold" },
  headerTitle: {
    fontFamily: "LobsterTwo_700Bold_Italic",
    fontSize: 25,
    color: "darkgreen",
  },
  headerSubTitle: {
    fontFamily: "LobsterTwo_700Bold_Italic",
    fontSize: 17,
    color: "darkgreen",
  },
});
