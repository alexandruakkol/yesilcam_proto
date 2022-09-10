import { StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import {
  NativeBaseProvider,
  Center,
  View,
  Fab,
  Icon,
  Modal,
  FormControl,
  Input,
  Button,
  Divider,
  HStack,
} from "native-base";
import { useState, useReducer } from "react";
import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import SocialCluster from "../components/SocialCluster";
import { AntDesign } from "@expo/vector-icons";
import { newPost } from "../firebase";
import GPC from "../global";

const bkgColor = "#ebecf0";

const Community = ({ navigation }) => {
  const defaultState = {
    eventName: "",
    location: "",
    time: "",
    details: "",
  };
  const [showModal, setShowModal] = useState(false);
  const [postType, setPostType] = useState("socialPost");
  const [postData, setPostData] = useState();

  const [state, dispatch] = useReducer(reducer, defaultState);
  function reducer(state, action) {
    state = {
      ...state,
      ...action.payload,
    };
    return state;
  }

  function handlePost() {
    //write socialPost
    if (postType == "socialPost") {
      newPost({
        type: "socialPost",
        body: postData,
        user: GPC.usrData_id,
      });
      setPostData("");
      return;
    }
    //else, write event post
    newPost({
      type: "event",
      ...state,
    });
    setPostData("");
    return;
  }
  return (
    <NativeBaseProvider>
      <View style={styles.pageContainer}>
        <Header style={styles.header}></Header>

        <SocialCluster></SocialCluster>
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          avoidKeyboard
          justifyContent="flex-end"
          bottom="4"
          size="full"
          style={styles.modal}
        >
          <Modal.Content h="80%">
            <Modal.Header>
              <Center>
                <HStack>
                  <TouchableWithoutFeedback
                    onPress={() => setPostType("socialPost")}
                  >
                    <Text style={styles.selectorText}>Social Post</Text>
                  </TouchableWithoutFeedback>
                  <Divider
                    bg="grey"
                    thickness="2"
                    mx="2"
                    orientation="vertical"
                  />
                  <TouchableWithoutFeedback
                    onPress={() => setPostType("event")}
                  >
                    <Text style={styles.selectorText}>Event</Text>
                  </TouchableWithoutFeedback>
                </HStack>
              </Center>
            </Modal.Header>
            <Modal.Body>
              {postType == "socialPost" && (
                <FormControl>
                  <Input
                    height="80"
                    mt="3"
                    multiline
                    placeholder="Share something"
                    value={postData}
                    onChangeText={(postData) => setPostData(postData)}
                  />
                </FormControl>
              )}
              {postType == "event" && (
                <FormControl>
                  <Input
                    height="40%"
                    mt="1"
                    multiline
                    placeholder="Name of the event"
                    value={state.eventName}
                    onChangeText={(eventName) =>
                      dispatch({ payload: { eventName } })
                    }
                  />
                  <Input
                    height="20%"
                    mt="1"
                    placeholder="Location"
                    value={state.location}
                    onChangeText={(location) =>
                      dispatch({ payload: { location } })
                    }
                  />
                  <Input
                    height="20%"
                    mt="1"
                    placeholder="Time"
                    value={state.time}
                    onChangeText={(time) => dispatch({ payload: { time } })}
                  />
                  <Input
                    height="248%"
                    mt="1"
                    multiline
                    placeholder="Details"
                    value={state.details}
                    onChangeText={(details) =>
                      dispatch({ payload: { details } })
                    }
                  />
                </FormControl>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  bg="darkgreen"
                  onPress={() => {
                    handlePost();
                    setShowModal(false);
                  }}
                >
                  Post
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
        <Fab
          renderInPortal={false}
          shadow={2}
          size="sm"
          icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />}
          bg="darkgreen"
          onPress={() => setShowModal(true)}
        />
      </View>

      <Navbar navigation={navigation} name="plus" as={AntDesign}></Navbar>
    </NativeBaseProvider>
  );
};

export default Community;

const styles = StyleSheet.create({
  pageContainer: {
    height: "94%",
    backgroundColor: bkgColor,
  },
  fab: {},
  selectorText: {
    fontSize: "55",
  },
});
