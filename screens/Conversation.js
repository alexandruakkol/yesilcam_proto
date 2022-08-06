import { StyleSheet, Text, View } from "react-native";
import { NativeBaseProvider, Center, Avatar, HStack, Input } from "native-base";
import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { auth, getConversation } from "../firebase";
import { retrieve } from "../storage";
import GPC from "../global";

const bkgColor = "#ebecf0";

const Conversation = ({ navigation, route }) => {
  const convo = route.params.convo;
  let chatteePic = route.params.chateePic;
  const [dataReady, setDataReady] = useState(false);
  const [myData, setMyData] = useState();
  const [myPic, setMyPic] = useState();

  useEffect(() => {
    console.log("accessing conversation:", convo);
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
            myData[messageKey].pic =
              myData[messageKey].from === auth.currentUser.uid
                ? myPic
                : chatteePic;

            return (
              <View key={messageKey}>
                <HStack space={2} style={styles.chatHStack}>
                  <Avatar
                    style={styles.chatteeImg}
                    size="sm"
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
        <Center style={{marginVertical:10}}>
          <Input style={styles.input} variant="rounded" w="85%"></Input>
        </Center>

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
  messageBox: {
    backgroundColor: "#a2c794",
    borderRadius: 8,
    height: 35,
    marginTop: 8,
  },
  messageText: { marginHorizontal: 12, paddingVertical: 10 },
  input: {
    
  },
});
