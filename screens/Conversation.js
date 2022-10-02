import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { NativeBaseProvider, Center, Avatar, HStack, Input } from "native-base";
import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { retrieve } from "../storage";
import { getGPC } from "../global";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { newRealtimeMessage, getRealtimeMessages } from "../firebase";

const bkgColor = "#ebecf0";

const Conversation = ({ navigation, route }) => {
  const convo = route.params.convo;
  let chatteePic = route.params.chatteeImg;
  const [myData, setMyData] = useState();
  const [myPic, setMyPic] = useState();
  const [message, setMessage] = useState();
  const [GPCl, setGPCl] = useState({});

  function sendMessage(message) {
    if (!message.match("[^ ]")) return;
    newRealtimeMessage({ body: message }, convo);
    setMessage("");
  }

  useEffect(() => {
    setGPCl(getGPC());
    if (GPCl["usrData_profilePicture"])
      setMyPic(GPCl["usrData_profilePicture"]);
    getRealtimeMessages(convo, setMyData);
  }, []);

  if (!myData) {
    return <Text>Loading...</Text>;
  } else
    return (
      <NativeBaseProvider>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.pageContainer}>
            <Header />

            {Object.keys(myData).map((messageKey) => {
              myData[messageKey].pic = chatteePic;

              return (
                <View key={messageKey}>
                  <HStack
                    space={2}
                    style={[
                      myData[messageKey].from === auth.currentUser.uid
                        ? styles.myMsgStack
                        : styles.otherMsgStack,
                      styles.chatHStack,
                    ]}
                  >
                    <Avatar
                      style={styles.chatteeImg}
                      size="sm"
                      display={
                        myData[messageKey].from === auth.currentUser.uid
                          ? "none"
                          : ""
                      }
                      source={{
                        uri: myData[messageKey].pic,
                      }}
                    ></Avatar>
                    <View style={styles.messageBox}>
                      <Text style={styles.messageText}>
                        {myData[messageKey].body}
                      </Text>
                    </View>
                  </HStack>
                </View>
              );
            })}
          </View>
          <HStack style={{ marginVertical: 10 }}>
            <Input
              style={styles.input}
              variant="rounded"
              backgroundColor={bkgColor}
              w="85%"
              marginLeft={3}
              value={message}
              onChangeText={(e) => {
                setMessage(e);
              }}
            ></Input>
            <TouchableWithoutFeedback
              onPress={() => {
                sendMessage(message);
              }}
            >
              <FontAwesome
                name="send-o"
                size={18}
                color="gray"
                style={{
                  paddingTop: 8,
                  paddingLeft: 10,
                }}
              />
            </TouchableWithoutFeedback>
          </HStack>

          <Navbar navigation={navigation}></Navbar>
        </KeyboardAvoidingView>
      </NativeBaseProvider>
    );
};

export default Conversation;

const styles = StyleSheet.create({
  pageContainer: {
    height: "87%",
    backgroundColor: bkgColor,
  },
  chatteeImg: {
    marginVertical: 10,
  },
  chatHStack: {
    marginHorizontal: 4,
  },
  myMsgStack: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: 10,
  },
  otherMsgStack: { justifyContent: "flex", alignItems: "flex", marginLeft: 10 },
  messageBox: {
    backgroundColor: "#a2c794",
    borderRadius: 8,
    flex: 0.75,
    height: "auto",
    marginTop: 8,
  },
  messageText: { marginHorizontal: 12, paddingVertical: 10 },
  input: {},
});
