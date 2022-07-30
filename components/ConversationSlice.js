import { StyleSheet, Text } from "react-native";
import { NativeBaseProvider, Center, View, Image } from "native-base";
import React from "react";
import { useRef, useState } from "react";
import { getUserDataByID, auth } from "../firebase";
import { useEffect } from "react";

export default function ConversationSlice() {
  const [myData, setMyData] = useState();

  useEffect(() => {
    getUserDataByID(auth.currentUser.uid).then((r) => {
      setMyData(r);
    });
  }, []);

  if (typeof myData !== "object") {
    return <Text>Loading...</Text>;
  } else
    return (
      <NativeBaseProvider>
        {Object.keys(myData.chats).map((convoKey) => {
          let lastMessageKey = Object.keys(myData["chats"][convoKey])[0];
          let from = myData.chats[convoKey][lastMessageKey].from;
          let lastMessage = myData.chats[convoKey][lastMessageKey].body;

          return (
            <View style={styles.slice} key={from}>
              <Text style={styles.lastText}>{lastMessage}</Text>
              <Text style={styles.lastText}>{from}</Text>
            </View>
          );
        })}
      </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
  slice: {},
  lastText: {},
});
