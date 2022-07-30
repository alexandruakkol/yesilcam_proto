import { StyleSheet, Text } from "react-native";
import React from "react";
import {
  NativeBaseProvider,
  Image,
  View,
  VStack,
  Center,
  HStack,
} from "native-base";

const jsonData = require("../mock_data/posts.json");
const profilePicSize = 50;

const SocialPost = (props) => {
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
        <VStack space={0.2}>
          <HStack space={3}>
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.time}>{props.time}</Text>
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
  return (
    <View>
      {Object.keys(jsonData).map((key) => {
        return (
          <SocialPost
            key={key}
            picture={jsonData[key].picture}
            name={jsonData[key].firstName + " " + jsonData[key].lastName}
            body={jsonData[key].body}
            time={jsonData[key].time}
          ></SocialPost>
        );
      })}
    </View>
  );
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
  time: {},
});
