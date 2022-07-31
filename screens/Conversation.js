import { StyleSheet, Text, View } from "react-native";
import { NativeBaseProvider, Center, Avatar } from "native-base";
import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getConversation } from "../firebase";

const bkgColor = "#ebecf0";

const Conversation = ({ navigation, route }) => {
  const convo = route.params.convo;
  const chateePic = route.params.chateePic;
  const [dataReady, setDataReady] = useState(false);
  const [myData, setMyData] = useState();

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
  }, []);

  if (!dataReady) {
    return <Text>Loading...</Text>;
  } else
    return (
      <NativeBaseProvider>
        <View style={styles.pageContainer}>
          <Header />
          <Avatar
            style={styles.chatteeImg}
            size="lg"
            source={{
              uri: chateePic,
            }}
          ></Avatar>
          {Object.keys(myData).map((messageKey) => {
            return (
              <View key={messageKey}>
                <View style={styles.messageBox}>
                  <Text style={styles.messageText}>
                    {myData[messageKey].body}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
        <Navbar navigation={navigation}></Navbar>
      </NativeBaseProvider>
    );
};

export default Conversation;

const styles = StyleSheet.create({
  pageContainer: {
    height: "94%",
    backgroundColor: bkgColor,
  },
  chatteeImg: {},

  messageBox: { backgroundColor: "purple", borderRadius: 30 },
  messageText: {},
});
