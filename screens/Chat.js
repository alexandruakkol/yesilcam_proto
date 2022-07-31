import { StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import {
  NativeBaseProvider,
  Center,
  View,
  Image,
  Avatar,
  HStack,
  VStack,
} from "native-base";
import React from "react";
import { useRef, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { auth, getUserDataByID } from "../firebase";
const bkgColor = "#ebecf0";

const Chat = ({ navigation }) => {
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
              ...{ firstName: q.firstName },
              ...{ lastName: q.lastName },
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
        <View style={styles.pageContainer}>
          <Header />
          {Object.keys(myData.chats).map((convoKey) => {
            console.log(convoKey);
            let lastMessageKey = Object.keys(myData["chats"][convoKey])[0];
            let from = myData.chats[convoKey][lastMessageKey].from;
            let lastMessage = myData.chats[convoKey][lastMessageKey].body;
            let chateePic = myData.chats[convoKey]["photo"];
            let firstName = myData.chats[convoKey]["firstName"];
            let lastName = myData.chats[convoKey]["lastName"];
            return (
              <TouchableWithoutFeedback
                key={from}
                onPress={() =>
                  navigation.navigate("Conversation", {
                    convo: convoKey,
                    chateePic,
                  })
                }
              >
                <HStack style={styles.slice} space={2}>
                  <Avatar
                    style={styles.chatteeImg}
                    size="lg"
                    source={{
                      uri: chateePic,
                    }}
                  ></Avatar>
                  <View>
                    <VStack space={2}>
                      <Text style={styles.from}>
                        {firstName} {lastName}
                      </Text>
                      <Text style={styles.lastText}>{lastMessage}</Text>
                    </VStack>
                  </View>
                </HStack>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
        <Navbar navigation={navigation}></Navbar>
      </NativeBaseProvider>
    );
};

export default Chat;

const styles = StyleSheet.create({
  pageContainer: {
    height: "94%",
    backgroundColor: bkgColor,
  },

  convserationSlice: {
    view: {},
  },
  slice: {
    marginLeft: 5,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  from: { fontWeight: "bold", fontSize: 17 },
  lastText: { fontSize: 14 },
});
