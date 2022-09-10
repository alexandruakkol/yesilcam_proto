import { StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import {
  NativeBaseProvider,
  Image,
  View,
  VStack,
  Center,
  HStack,
  Actionsheet,
  ScrollView,
  Box,
} from "native-base";
import { getCollection, getUserDataByID } from "../firebase";
import { Entypo } from "@expo/vector-icons";
import { connectStorageEmulator } from "firebase/storage";

const profilePicSize = 50;

const SocialPost = (props) => {
  const [actionsheetIsOpen, setActionSheetIsOpen] = useState(false);
  function onActionsheetClose() {
    setActionSheetIsOpen(false);
  }
  function onActionsheetOpen() {
    setActionSheetIsOpen(true);
  }
  return (
    <View style={styles.postDiv}>
      <HStack space={2}>
        <Image
          style={styles.profilePic}
          source={{
            uri: props.picture,
          }}
          alt="profile picture"
        ></Image>
        <VStack space={0.2} w="full">
          <HStack space={5} w="full">
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.time}>{props.time}</Text>
            <TouchableWithoutFeedback onPress={onActionsheetOpen}>
              <Entypo name="dots-three-horizontal" size={12} color="black" />
            </TouchableWithoutFeedback>
            <Actionsheet
              isOpen={actionsheetIsOpen}
              onClose={onActionsheetClose}
            >
              <Actionsheet.Content>
                <Box w="100%" h={60} px={4} justifyContent="center"></Box>
                {true && (
                  <TouchableWithoutFeedback onPress={() => {}}>
                    <Actionsheet.Item>Delete post</Actionsheet.Item>
                  </TouchableWithoutFeedback>
                )}

                <Actionsheet.Item>Cancel</Actionsheet.Item>
              </Actionsheet.Content>
            </Actionsheet>
          </HStack>
          <View w="90%">
            <Text style={styles.body}>{props.body}</Text>
          </View>
        </VStack>
      </HStack>
    </View>
  );
};

const SocialCluster = () => {
  const [data, setData] = useState({});
  const [dataIsReady, setDataIsReady] = useState(false);
  useEffect(() => {
    getCollection("posts").then((colData) => {
      colData.forEach((post) => {
        getUserDataByID(post.user).then((usrData) => {
          console.log(post, "post");
          setData({
            ...data,
            ...{
              [post.id]: {
                ...post,
                firstName: usrData.firstName,
                lastName: usrData.lastName,
                picture: usrData.profilePicture,
              },
            },
          });
          setDataIsReady(true);
        });
      });
    });
  }, []);
  if (!dataIsReady) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <ScrollView>
        {Object.values(data).map((post) => {
          return (
            <SocialPost
              key={post.id}
              name={post.firstName + " " + post.lastName}
              picture={post.picture}
              body={post.body}
              time={post.time
                .toDate()
                .toLocaleString("en-GB", { timeZone: "UTC" })}
            ></SocialPost>
          );
        })}
      </ScrollView>
    );
  }
};

export default SocialCluster;

const styles = StyleSheet.create({
  postDiv: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    paddingVertical: 12,
    marginLeft: 4,
  },

  profilePic: {
    width: profilePicSize,
    height: profilePicSize,
    borderRadius: profilePicSize / 2.5,
    borderColor: "gray",
  },
  name: { fontWeight: "bold", fontSize: 15 },
  body: {},
  time: { textAlign: "right" },
});
