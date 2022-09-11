import { StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import {
  NativeBaseProvider,
  Image,
  View,
  VStack,
  Center,
  HStack,
  ScrollView,
  Box,
  Modal,
  Divider,
} from "native-base";
import React, { useEffect, useState } from "react";
import { getComments } from "../firebase";
import { FontAwesome5 } from "@expo/vector-icons";

const profilePicSize = 50;
const ExpandedPost = (props) => {
  return (
    <Modal
      isOpen={props.showCommentModal}
      onClose={() => props.setShowCommentModal(false)}
      size={"full"}
      justifyContent="flex-start"
      style={styles.modal}
    >
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>
          {props.props.type == "socialPost" ? "Post" : "Event"}
        </Modal.Header>
        <Modal.Body>
          {props.props.type == "socialPost" && (
            <View style={styles.socialPost}>
              <HStack space={2}>
                <Image
                  style={styles.profilePic}
                  source={{
                    uri: props.props.picture,
                  }}
                  alt="profile picture"
                ></Image>
                <VStack space={0.2} w="full">
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.name}>{props.props.name}</Text>

                    <View
                      style={{
                        flexDirection: "row",
                        marginRight: "20%",
                      }}
                    >
                      <Text style={styles.time}>{props.props.time}</Text>
                    </View>
                  </View>
                  <View w="90%">
                    <Text style={styles.body}>{props.props.body}</Text>
                  </View>
                </VStack>
              </HStack>
            </View>
          )}
          {props.type == "event" && (
            <View style={styles.eventPost}>
              <HStack space={2}>
                <Image
                  style={styles.profilePic}
                  source={{
                    uri: props.props.picture,
                  }}
                  alt="profile picture"
                ></Image>
                <VStack space={0.2} w="full">
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.name}>{props.props.name}</Text>

                    <View
                      style={{
                        flexDirection: "row",
                        marginRight: "20%",
                      }}
                    >
                      <Text style={styles.time}>{props.props.time}</Text>
                    </View>
                  </View>
                  <VStack w="90%">
                    <View style={styles.eventDetails}>
                      <Text style={[styles.eventTitle, styles.detailsText]}>
                        {props.props.eventName}
                      </Text>
                    </View>
                    <View style={styles.eventDetails}>
                      <Text style={styles.setDetails}>Time</Text>
                      <Text style={styles.detailsText}>
                        {props.props.eventTime}
                      </Text>
                    </View>
                    <View style={styles.eventDetails}>
                      <Text style={styles.setDetails}>Location</Text>
                      <Text style={styles.detailsText}>
                        {props.props.location}
                      </Text>
                    </View>
                    <View style={styles.eventDetails}>
                      <Text style={styles.detailsText}>{props.props.body}</Text>
                    </View>
                  </VStack>
                </VStack>
              </HStack>
            </View>
          )}

          <Divider mb={2}></Divider>

          <View ml={4}>
            <FontAwesome5 name="comment" size={17} color="grey" />
          </View>
        </Modal.Body>

        <Modal.Footer style={styles.comments}>
          <Comments postProps={props.props}></Comments>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

const Comments = (props) => {
  const [dataReady, setDataReady] = useState(false);
  useEffect(() => {
    console.log(props.postProps);
    getComments(props.postProps.id).then((comments) => console.log(comments));
  }, []);

  if (!dataReady) return <Text>Loading...</Text>;
  return (
    <View>
      <Text>Comments</Text>
    </View>
  );
};

export default ExpandedPost;

const styles = StyleSheet.create({
  postWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    marginLeft: 4,
    paddingVertical: 10,
  },
  modal: {
    marginTop: "10%",
    marginHorizontal: "1%",
  },
  comments: {
    justifyContent: "left",
  },
  setDetails: { fontWeight: "bold" },
  detailsText: { marginBottom: 6 },
  profilePic: {
    width: profilePicSize,
    height: profilePicSize,
    borderRadius: profilePicSize / 2.5,
    borderColor: "gray",
  },
  name: { fontWeight: "bold", fontSize: 15 },
  eventTitle: { fontSize: 22 },
  time: { textAlign: "right", marginRight: 5 },
});
