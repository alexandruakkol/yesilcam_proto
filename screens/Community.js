import { StyleSheet, Text } from "react-native";
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
} from "native-base";
import { useState } from "react";
import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import SocialCluster from "../components/SocialCluster";
import { AntDesign } from "@expo/vector-icons";
import { newPost } from "../firebase";
import GPC from "../global";

const bkgColor = "#ebecf0";

const Community = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const [postData, setPostData] = useState();

  function handlePost() {
    newPost({
      body: postData,
      picture: GPC.usrData_image,
      firstName: GPC.usrData_firstName,
      lastName: GPC.usrData_lastName,
    });
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
        >
          <Modal.Content>
            <Modal.Header>Post on Community</Modal.Header>
            <Modal.Body>
              <FormControl>
                <Input
                  height="40"
                  mt="3"
                  multiline
                  placeholder="Share something"
                  onChangeText={(postData) => setPostData(postData)}
                />
              </FormControl>
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
});
