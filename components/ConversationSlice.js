import { StyleSheet, Text } from "react-native";
import { NativeBaseProvider, Center, View, Image } from "native-base";
import React from "react";

export default function ConversationSlice(props) {
  return (
    <NativeBaseProvider>
      <View style={styles.slice}>
        <Image alt="profile picture" uri={props.image}></Image>
        <Text style={styles.lastText}>{props.body}</Text>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  slice: {},
  lastText: {},
});
