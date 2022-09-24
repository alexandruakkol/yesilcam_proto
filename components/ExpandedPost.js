import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import {
  NativeBaseProvider,
  Image,
  VStack,
  Center,
  HStack,
  Box,
  ScrollView,
  FlatList,
  View,
  Text,
  Modal,
  Divider,
  Input,
} from "native-base";
import React, { useEffect, useState } from "react";
import { createComment, getComments, getUserDataByID, auth } from "../firebase";
import GPC from "../global";
import dayjs from "dayjs";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import Comments from "../components/Comments";
const profilePicSize = 50;
const ExpandedPost = (props) => {
  const [newComment, setNewComment] = useState();
  const [refresh, setRefresh] = useState(false);
  function postComment(newComment) {
    if (!newComment.match("[^ ]")) return;
    createComment(props.props.id, newComment);
    setNewComment("");
    setRefresh(!refresh);
  }

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
            <View>
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
                      <Text style={styles.time}>
                        {dayjs(props.props.time).format("D MMM YYYY H:mm")}
                      </Text>
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
              </HStack>{" "}
            </View>
          )}{" "}
          <Comments postProps={{ ...props.props, ...refresh }}></Comments>
        </Modal.Body>

        <Modal.Footer></Modal.Footer>

        <HStack space={1.5} ml={1}>
          <Image
            style={styles.myCommPic}
            source={{
              uri: GPC.usrData_profilePicture,
            }}
            alt="profile picture"
          ></Image>
          <Input
            placeholder="Add a comment"
            w="80%"
            variant="rounded"
            mb={1}
            value={newComment}
            onChangeText={(e) => {
              setNewComment(e);
            }}
          ></Input>
          <TouchableWithoutFeedback
            onPress={() => {
              postComment(newComment);
            }}
          >
            <FontAwesome
              name="send-o"
              size={18}
              color="gray"
              style={{
                paddingTop: 8,
              }}
            />
          </TouchableWithoutFeedback>
        </HStack>
      </Modal.Content>
    </Modal>
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

  myCommPic: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2.5,
    borderColor: "gray",
  },
  profilePic: {
    width: profilePicSize,
    height: profilePicSize,
    borderRadius: profilePicSize / 2.5,
    borderColor: "gray",
  },

  eventTitle: { fontSize: 22 },
});
