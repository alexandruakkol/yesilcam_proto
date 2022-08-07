import { StyleSheet, Text, View } from "react-native";
import { NativeBaseProvider, Center, Avatar, HStack, Input } from "native-base";
import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { auth, getConversation } from "../firebase";
import { retrieve } from "../storage";
import GPC from "../global";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { newRealtimeMessage } from "../firebase";

const bkgColor = "#ebecf0";



const Conversation = ({ navigation, route }) => {
  const convo = route.params.convo;
  let chatteePic = route.params.chateePic;
  const [dataReady, setDataReady] = useState(false);
  const [myData, setMyData] = useState();
  const [myPic, setMyPic] = useState();
  const [message, setMessage] = useState();

  function sendMessage(message) {
    newRealtimeMessage({body:message}, convo);
    console.log('message is sent');
    }

  useEffect(() => {
    getConversation(convo)
      .then((r) => {
        setMyData(r);
        console.log("data:", r);
      })
      .finally(() => {
        setDataReady(true);
      });

    if (GPC["usrData_profilePicture"]) setMyPic(GPC["usrData_profilePicture"]);
  }, []);

  if (!dataReady) {
    return <Text>Loading...</Text>;
  } else
    return (
      <NativeBaseProvider>
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
  myMsgStack: { justifyContent: 'flex-end',
    alignItems: 'flex-end',
     marginRight: 10 },
  otherMsgStack: {},
  messageBox: {
    backgroundColor: "#a2c794",
    borderRadius: 8,
    height: 35,
    marginTop: 8,
  }, 
  messageText: { marginHorizontal: 12, paddingVertical: 10 },
  input: {},
});
