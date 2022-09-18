import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { DarkModeContext, DarkModeProvider } from "../context/darkModeContext";

const Page = ({ children }) => {
  const darkMode = useContext(DarkModeContext);
  console.log(darkMode);
  return (
    <View style={styles.page}>
      <DarkModeProvider>{children}</DarkModeProvider>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  page: {
    height: "94%",
  },
  dark: {},
  light: {},
});
