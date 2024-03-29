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
import { auth, getUserDataByID, getChatData } from "../firebase";
import { set } from "firebase/database";
import {
  useFonts,
  LobsterTwo_700Bold_Italic,
} from "@expo-google-fonts/lobster-two";
import { getGPC } from "../global";
const bkgColor = "#ebecf0";

const Chat = ({ navigation }) => {
  const [myData, setMyData] = useState([]);
  const [pageStatus, setPageStatus] = useState("loading");
  const [GPCl, setGPCl] = useState({});
  let [fontsLoaded] = useFonts({
    LobsterTwo_700Bold_Italic,
  });

  useEffect(() => {
    setGPCl(getGPC());
    getUserDataByID(auth.currentUser.uid).then((r) => {
      if (!r.chats) {
        setPageStatus("noData");
        return;
      }
      Object.keys(r.chats).forEach((convoKey) => {
        console.log("CONVO", convoKey);
        getChatData(convoKey).then((chatData) => {
          chatData = chatData.val();
          Object.keys(chatData.members).forEach((member) => {
            if (member === GPCl.usrData_id) return;
            chatData.otherPerson = member;
          });
          getUserDataByID(chatData.otherPerson).then((theirData) => {
            // join user and chat dimensions
            setMyData((myData) => [
              ...myData,
              { ...chatData, ...theirData, convoKey },
            ]);
          });
        });
      });
      setPageStatus("ready");
    });
  }, []);

  if (pageStatus === "loading") return <Text>Loading...</Text>;
  if (pageStatus === "noData") {
    if (!fontsLoaded) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    } else
      return (
        <>
          <View style={styles.pageContainer}>
            <Header />
            <View flex={1} justifyContent="center">
              <Center>
                <Text style={styles.noMessagesText}>No messages</Text>
              </Center>
            </View>
          </View>
          <Navbar navigation={navigation}></Navbar>
        </>
      );
  }
  if (pageStatus === "ready")
    return (
      <NativeBaseProvider>
        <View style={styles.pageContainer}>
          <Header />
          {myData.map((convo) => {
            return (
              <TouchableWithoutFeedback
                key={convo.otherPerson}
                onPress={() =>
                  navigation.navigate("Conversation", {
                    convo: convo.convoKey,
                    chatteeImg: convo.photo,
                  })
                }
              >
                <HStack style={styles.slice} space={2}>
                  <Avatar
                    style={styles.chatteeImg}
                    size="lg"
                    source={{
                      uri: convo.photo,
                    }}
                  ></Avatar>
                  <View>
                    <VStack space={2}>
                      <Text style={styles.from}>
                        {convo.firstName} {convo.lastName}
                      </Text>
                      <Text style={styles.lastText}>{convo.lastMessage}</Text>
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
  noMessagesText: {
    fontFamily: "LobsterTwo_700Bold_Italic",
    fontSize: 28,
    color: "darkgreen",
  },
  from: { fontWeight: "bold", fontSize: 17 },
  lastText: { fontSize: 14 },
});
