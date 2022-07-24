import { StyleSheet, Text } from "react-native";
import { NativeBaseProvider, Center, View } from "native-base";
import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import SocialCluster from "../components/SocialCluster";

const bkgColor = "#ebecf0";

const Community = () => {
  return (
    <NativeBaseProvider>
      <View style={styles.pageContainer}>
        <Header style={styles.header}></Header>

        <SocialCluster></SocialCluster>
      </View>
      <Navbar></Navbar>
    </NativeBaseProvider>
  );
};

export default Community;

const styles = StyleSheet.create({
  pageContainer: {
    height: "94%",
    backgroundColor: bkgColor,
  },
});
