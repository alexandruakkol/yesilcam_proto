import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import {
  NativeBaseProvider,
  Image,
  VStack,
  Center,
  HStack,
  ScrollView,
  Box,
  View,
  Text,
  Modal,
  Divider,
  Input,
} from "native-base";
import React, { useEffect, useState } from "react";
import { createComment, getComments, getUserDataByID, auth } from "../firebase";
import { FontAwesome5 } from "@expo/vector-icons";
import { clockRunning } from "react-native-reanimated";
import GPC from "../global";
import dayjs from "dayjs";
import { FontAwesome, Entypo } from "@expo/vector-icons";

const profilePicSize = 50;
const ExpandedPost = (props) => {
  console.log(auth.currentUser);
  const [newComment, setNewComment] = useState();

  function postComment(newComment) {
    if (!newComment.match("[^ ]")) return;
    createComment(props.props.id, newComment);
    setNewComment("");
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
              </HStack>
            </View>
          )}
        </Modal.Body>

        <Modal.Footer style={styles.comments}>
          <Comments postProps={props.props}></Comments>
        </Modal.Footer>
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

const Comments = (props) => {
  const [dataReady, setDataReady] = useState(false);
  const [data, setData] = useState([]);
  let comCount = 0;
  let shortNo = Intl.NumberFormat("en", { notation: "compact" });
  let results = [];
  useEffect(() => {
    getComments(props.postProps.id).then((comments) => {
      if (!comments) {
        setDataReady("noComments");
        return;
      }
      comCount = comments.length;
      comments.forEach((comment) => {
        //join user data on comment objects
        getUserDataByID(comment.from).then((usrData) => {
          results = data;
          results.push({
            photo: usrData.photo,
            firstName: usrData.firstName,
            lastName: usrData.lastName,
            ...comment,
          });
          console.log(results);
          setData(results);
          if (data.length == comCount) setDataReady(true);
        });
      });
    });
  }, []);

  if (!dataReady) return <Text>Loading...</Text>;
  if (dataReady == "noComments") return <Text>No comments</Text>;
  if (dataReady && data)
    return (
      <VStack style={styles.comment}>
        <ScrollView>
          {console.log("data", data)}
          {data.map((comment) => {
            console.log("com", comment);
            return (
              <View key={comment.id}>
                <HStack space={2}>
                  <Image
                    style={styles.profilePic}
                    source={{
                      uri: comment.photo,
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
                      <Text style={styles.name}>
                        {comment.firstName + " " + comment.lastName}
                      </Text>

                      <View
                        style={{
                          flexDirection: "row",
                          marginRight: "20%",
                        }}
                      >
                        <Text style={styles.time}>
                          {dayjs(comment.time.toDate()).fromNow(true) + " ago"}
                        </Text>
                        <Entypo
                          name="dots-three-horizontal"
                          size={12}
                          color="black"
                          style={{ marginTop: 3 }}
                        />
                      </View>
                    </View>
                    <View w="90%">
                      <Text style={styles.body}>{comment.body}</Text>
                    </View>
                  </VStack>
                </HStack>
                <Divider mb={2}></Divider>
              </View>
            );
          })}
        </ScrollView>
      </VStack>
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
  comment: { marginLeft: -15, marginRight: -5, flex: 1, marginVertical: 0 },
  setDetails: { fontWeight: "bold" },
  detailsText: { marginBottom: 6 },
  profilePic: {
    width: profilePicSize,
    height: profilePicSize,
    borderRadius: profilePicSize / 2.5,
    borderColor: "gray",
  },
  myCommPic: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2.5,
    borderColor: "gray",
  },
  name: { fontWeight: "bold", fontSize: 15 },
  eventTitle: { fontSize: 22 },
  time: { textAlign: "right", marginRight: 5 },
});
