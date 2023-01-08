import { StyleSheet, Text, TouchableWithoutFeedback} from "react-native";
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
  Modal,
} from "native-base";
import { getCollection, getUserDataByID } from "../firebase";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import ExpandedPost from "./ExpandedPost";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {getGPC} from "../global";

const profilePicSize = 50;

const SocialPost = (props) => {
  const [actionsheetIsOpen, setActionSheetIsOpen] = useState(false);
  function onActionsheetClose() {setActionSheetIsOpen(false)}
  function onActionsheetOpen() {setActionSheetIsOpen(true)}
  const [showCommentModal, setShowCommentModal] = useState(false);
  let GPCl = getGPC();
  return (
    <TouchableWithoutFeedback onPress={() => setShowCommentModal(true)}>
      <View style={styles.postWrapper}>
        {showCommentModal && (
          <ExpandedPost props={props} showCommentModal={showCommentModal} setShowCommentModal={setShowCommentModal}></ExpandedPost>
        )}
        {props.type == "socialPost" && (
          <View style={styles.socialPost}>
            <HStack space={2}>
              <Image style={styles.profilePic} source={{uri: props.picture}} alt="profile picture" ></Image>
              <VStack space={0.2} w="full">
                <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
                  <Text style={styles.name}>{props.name}</Text>
                  <View style={{ flexDirection: "row", marginRight: "20%"}}>
                    <Text style={styles.time}>
                      {dayjs(props.time).fromNow(true) + " ago"}
                    </Text>
                    <TouchableWithoutFeedback onPress={onActionsheetOpen}>
                      <Entypo name="dots-three-horizontal" size={12} color="black" style={{ marginTop: 3 }}/>
                    </TouchableWithoutFeedback>
                    <Actionsheet isOpen={actionsheetIsOpen} onClose={onActionsheetClose}>
                      <Actionsheet.Content>
                        <Box w="100%" h={60} px={4} justifyContent="center"></Box>
                        {GPCl.usrData_id == props.user && (
                          <TouchableWithoutFeedback onPress={() => {}}>
                            <Actionsheet.Item>Delete post</Actionsheet.Item>
                          </TouchableWithoutFeedback>
                        )}
                        <Actionsheet.Item>Cancel</Actionsheet.Item>
                      </Actionsheet.Content>
                    </Actionsheet>
                  </View>
                </View>
                <View w="90%">
                  <Text style={styles.body}>{props.body}</Text>
                </View>
                <HStack mt="2" space={1}>
                  <View style={{ marginTop: 1.5 }}>
                    <FontAwesome5 name="comment" size={16} color="grey" />
                  </View>
                  <Text style={{ color: "grey" }}>{props.commentCount}</Text>
                </HStack>
              </VStack>
            </HStack>
          </View>
        )}

        {props.type == "event" && (
          <View style={styles.eventPost}>
            <HStack space={2}>
              <Image style={styles.profilePic} source={{ uri: props.picture }} alt="profile picture"></Image>
              <VStack space={0.2} w="full">
                <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
                  <Text style={styles.name}>{props.name}</Text>
                  <View style={{ flexDirection: "row", marginRight: "20%" }}>
                    <Text style={styles.time}>
                      {dayjs(props.time).fromNow(true) + " ago"}
                    </Text>
                    <TouchableWithoutFeedback onPress={onActionsheetOpen}>
                      <Entypo name="dots-three-horizontal" size={12} color="black" style={{ marginTop: 3 }}/>
                    </TouchableWithoutFeedback>
                    <Actionsheet isOpen={actionsheetIsOpen} onClose={onActionsheetClose}>
                      <Actionsheet.Content>
                        <Box w="100%" h={60} px={4} justifyContent="center" ></Box>
                        {GPCl.usrData_id == props.user && (
                          <TouchableWithoutFeedback onPress={() => {}}>
                            <Actionsheet.Item>Delete post</Actionsheet.Item>
                          </TouchableWithoutFeedback>
                        )}
                        <Actionsheet.Item>Cancel</Actionsheet.Item>
                      </Actionsheet.Content>
                    </Actionsheet>
                  </View>
                </View>
                <VStack w="90%">
                  <View style={styles.eventDetails}>
                    <Text style={[styles.eventTitle, styles.detailsText]}>
                      {props.eventName}
                    </Text>
                  </View>
                  <View style={styles.eventDetails}>
                    <Text style={styles.setDetails}>Time</Text>
                    <Text style={styles.detailsText}>{props.eventTime}</Text>
                  </View>
                  <View style={styles.eventDetails}>
                    <Text style={styles.setDetails}>Location</Text>
                    <Text style={styles.detailsText}>{props.location}</Text>
                  </View>
                  <View style={styles.eventDetails}>
                    <Text style={styles.detailsText}>{props.body}</Text>
                  </View>
                </VStack>
                <HStack mt="2" space={1}>
                  <View style={{ marginTop: 1.5 }}>
                    <FontAwesome5 name="comment" size={16} color="grey" />
                  </View>
                  <Text style={{ color: "grey" }}>{props.commentCount}</Text>
                </HStack>
              </VStack>
            </HStack>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const SocialCluster = (props) => {
  const [data, setData] = useState([]);
  const [dataReady, setDataReady] = useState(false);
  dayjs.extend(relativeTime);
  useEffect(() => {
    //clear states for the 'pseudo-refresh'
    setData([]);
    setDataReady(false);
    //join posts with user data
    getCollection("posts").then((colData) => {
      colData.forEach((post) => {
      getUserDataByID(post.user).then((usrData) => {
          setData((data) => [
            ...data,
            {
              [post.id]: {
                ...post,
                firstName: usrData.firstName,
                lastName: usrData.lastName,
                picture: usrData.profilePicture,
                id: post.id,
              },
            },
          ]);
        });
      });
      setDataReady(true);
    });
  }, [props.refresh]);
  if (!dataReady) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <ScrollView>
        {Object.values(data).map((post) => {
          post = Object.values(post)[0];
          return (
            <SocialPost
              key={post.id}
              id={post.id}
              name={post.firstName + " " + post.lastName}
              picture={post.picture}
              body={post.body ? post.body : post.details}
              time={post.time.toDate()}
              type={post.type}
              eventName={post.eventName}
              eventTime={post.eventTime}
              location={post.location}
              commentCount={post.commentCount}
              user={post.user}
            ></SocialPost>
          );
        })}
      </ScrollView>
    );
  }
};

export default SocialCluster;

const styles = StyleSheet.create({
  postWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    marginLeft: 4,
    paddingVertical: 10,
  },
  eventPost: {},
  socialPost: {},
  setDetails: { fontWeight: "bold" },
  detailsText: { marginBottom: 6 },
  eventDetails: {},
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
