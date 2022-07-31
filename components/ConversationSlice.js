import { StyleSheet, Text } from "react-native";
import { NativeBaseProvider, Center, View, Image, Avatar } from "native-base";
import React from "react";
import { useRef, useState } from "react";
import { getUserDataByID, auth } from "../firebase";
import { useEffect } from "react";

export default function ConversationSlice() {
  const [myData, setMyData] = useState();
  const [dataReady, setDataReady] = useState(false);
  const counter = useRef();

  useEffect(() => {
    let start = true;
    //getting current user chats and then 'joining' data of chat user
    getUserDataByID(auth.currentUser.uid).then((r) => {
      counter.current = Object.keys(r.chats).length;
      Object.keys(r.chats).forEach((convoKey) => {
        let lastMessageKey = Object.keys(r["chats"][convoKey])[0];
        let from = r.chats[convoKey][lastMessageKey].from;
        getUserDataByID(from)
          .then((q) => {
            r.chats[convoKey] = {
              ...r.chats[convoKey],
              ...{ photo: q.photo },
            };
          })
          .finally(() => {
            counter.current = counter.current - 1;
            setMyData(r);
            if (counter.current == 0) setDataReady(true);
          });
      });
    });
  }, []);

  if (!dataReady) {
    return <Text>Loading...</Text>;
  } else
    return (
      <NativeBaseProvider>
        {Object.keys(myData.chats).map((convoKey) => {
          console.log(convoKey);
          let lastMessageKey = Object.keys(myData["chats"][convoKey])[0];
          let from = myData.chats[convoKey][lastMessageKey].from;
          let lastMessage = myData.chats[convoKey][lastMessageKey].body;
          let chateePic = myData.chats[convoKey]["photo"];
          return (
            <View style={styles.slice} key={from}>
              <Text style={styles.from}>{from}</Text>
              <Text style={styles.lastText}>{lastMessage}</Text>
              <Avatar
                style={styles.chatteeImg}
                source={{
                  uri: chateePic,
                }}
              ></Avatar>
            </View>
          );
        })}
      </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
  slice: { borderBottomColor: "black" },
  lastText: {},
});
