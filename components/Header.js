import { StyleSheet, Text } from "react-native";
import React from "react";
import { NativeBaseProvider, Center, HStack, View } from "native-base";

const headerColor = "white";

const Header = () => {
  return (
    <HStack style={styles.header} space={12} justifyContent="center">
      <Center h="10" w="70%">
        <Text style={[styles.headerTitle, styles.headerElements]}>
          Green Pine Connects
        </Text>
      </Center>
    </HStack>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    paddingTop: 25,
    backgroundColor: headerColor,
    height: 75,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    marginBottom: -55,
  },
  headerElements: { fontWeight: "bold" },
  headerTitle: {
    fontFamily: "LobsterTwo_700Bold_Italic",
    fontSize: 25,
    color: "darkgreen",
  },
});
