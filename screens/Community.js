import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
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
import Page from "../components/Page";
import Header from "../components/Header";
import SocialCluster from "../components/SocialCluster";
import { AntDesign } from "@expo/vector-icons";
import { newPost } from "../firebase";
import { getGPC } from "../global";

const bkgColor = "#ebecf0";

const Community = ({ navigation }) => {
  const defaultState = {
    eventName: "",
    location: "",
    eventTime: "",
    details: "",
  };
  const [showModal, setShowModal] = useState(false);
  const [postType, setPostType] = useState("socialPost");
  const [postData, setPostData] = useState();
  const [refresh, setRefresh] = useState();
  const [state, dispatch] = useReducer(reducer, defaultState);
  function reducer(state, action) {
    state = {
      ...state,
      ...action.payload,
    };
    return state;
  }

  function handlePost() {
    GPCl = getGPC();
    //write socialPost
    if (postType == "socialPost") {
      newPost({
        type: "socialPost",
        body: postData,
        user: GPCl.usrData_id,
        comments: {},
        commentCount: 0,
      });
      setPostData("");
      setRefresh(!refresh);
      return;
    }
    //else, write event post
    newPost({
      type: "event",
      user: GPCl.usrData_id,
      comments: {},
      commentCount: 0,
      ...state,
    });
    setPostData("");
    return;
  }
  return (
    <NativeBaseProvider>
      <Page>
        <Header style={styles.header}></Header>
        <SocialCluster refresh={refresh}></SocialCluster>

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
                  <View ml="10%" mt={2}>
                    <TouchableWithoutFeedback
                      onPress={() => setPostType("socialPost")}
                    >
                      <Text style={styles.selectorText}>Social Post</Text>
                    </TouchableWithoutFeedback>
                  </View>
                  <Divider
                    bg="grey"
                    thickness="2"
                    mx="2"
                    orientation="vertical"
                  />
                  <View mt={2} mr={-8}>
                    <TouchableWithoutFeedback
                      onPress={() => setPostType("event")}
                    >
                      <Text style={styles.selectorText}>Event</Text>
                    </TouchableWithoutFeedback>
                  </View>

                  <Button
                    ml="30%"
                    variant="ghost"
                    colorScheme="blueGray"
                    onPress={() => {
                      setShowModal(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    mr="10%"
                    bg="darkgreen"
                    onPress={() => {
                      handlePost();
                      setShowModal(false);
                    }}
                  >
                    Post
                  </Button>
                </HStack>
              </Center>
            </Modal.Header>
            <Modal.Body>
              {postType == "socialPost" && (
                <FormControl>
                  <Input
                    height={550}
                    mt="3"
                    multiline
                    placeholder="Share something"
                    value={postData}
                    onChangeText={(postData) => {
                      setPostData(postData);
                    }}
                  />
                </FormControl>
              )}
              {postType == "event" && (
                <FormControl>
                  <Input
                    height={35}
                    mt="1"
                    multiline
                    placeholder="Name of the event"
                    value={state.eventName}
                    onChangeText={(eventName) =>
                      dispatch({ payload: { eventName } })
                    }
                  />
                  <Input
                    height={35}
                    mt="1"
                    placeholder="Location"
                    value={state.location}
                    onChangeText={(location) =>
                      dispatch({ payload: { location } })
                    }
                  />
                  <Input
                    height={35}
                    mt="1"
                    placeholder="Time"
                    value={state.eventTime}
                    onChangeText={(eventTime) =>
                      dispatch({ payload: { eventTime } })
                    }
                  />
                  <Input
                    height={450}
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

            <Modal.Footer></Modal.Footer>
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
      </Page>
      <Navbar navigation={navigation} name="plus" as={AntDesign}></Navbar>
    </NativeBaseProvider>
  );
};

export default Community;

const styles = StyleSheet.create({
  pageContainer: {
    height: "94%",
  },
  selectorText: {
    fontSize: "21",
  },
});
