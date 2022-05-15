import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import React from "react";
import {
  NativeBaseProvider,
  Input,
  Center,
  TextArea,
  VStack,
  Image,
  HStack,
  Button,
  Text,
  View,
  ScrollView,
  StatusBar
} from "native-base";

const profilePicSize = 200;
const headerColor = "#ffffff";
const bkgColor = "#ebecf0";
const inputColor = "white";

const ProfileSetup = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <StatusBar></StatusBar>
      <View style={styles.pageContainer}>
        <HStack style={styles.header} space={6} justifyContent="center">
          <Center h="10" w="25%" />
          <Center h="10" w="40%">
            <Text style={[styles.headerElements, styles.headerTitle]}>
              Edit profile
            </Text>
          </Center>
          <Button
            variant="link"
            bg={headerColor}
            h="10"
            w="25%"
            onPress={() => {
              navigation.navigate("Cards");
            }}
          >
            <Text style={[styles.doneText, styles.headerElements]}>Done</Text>
          </Button>
        </HStack>

        <ScrollView>
          <View style={styles.scrollView}>
            <Text style={styles.profilePicLabel}>My Photo</Text>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/875/875068.png",
              }}
              style={styles.profilePic}
              alt="Profile picture"
            ></Image>
            <Text italic style={styles.tapToEdit}>
              Tap to edit
            </Text>
            <VStack style={styles.vstack} space={5}>
              <HStack>
                <Input
                  style={styles.input}
                  bg={inputColor}
                  w="50%"
                  h="12"
                  placeholder="First name"
                ></Input>
                <Input
                  style={styles.input}
                  bg={inputColor}
                  w="50%"
                  placeholder="Last name"
                ></Input>
              </HStack>

              <Text style={styles.label}>About Me</Text>
              <TextArea
                style={styles.input}
                bg={inputColor}
                h="95"
                placeholder="Tell us a few words about yourself:
                            • What are your passions and aspirations?
                            • How do you go about achieveing your goals?"
              ></TextArea>

              <Text style={styles.label}>What I offer</Text>
              <TextArea
                style={styles.input}
                bg={inputColor}
                h="95"
                placeholder=" • What skills/experience do you want to share with others?
              • What resources, services, or materials are you able to offer?
               "
              ></TextArea>

              <Text style={styles.label}>What I seek</Text>
              <TextArea
                style={styles.input}
                bg={inputColor}
                h="95"
                placeholder=" • What do you seek by using this app?
              • What sort of project are you looking for help for?"
              ></TextArea>

              <Text style={styles.label}>Profession</Text>
              <Input
                style={styles.input}
                bg={inputColor}
                h="12"
                placeholder="Add profession"
              ></Input>

              <Text style={styles.label}>Located in</Text>
              <Input
                style={styles.input}
                bg={inputColor}
                h="12"
                placeholder="ex. San Diego, CA"
              ></Input>

              <Text style={styles.label}>Languages I speak</Text>
              <Input
                style={styles.input}
                bg={inputColor}
                h="12"
                placeholder="Add language"
              ></Input>
              <View h="10"></View>
            </VStack>
          </View>
        </ScrollView>
      </View>
    </NativeBaseProvider>
  );
};

export default ProfileSetup;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: bkgColor,
  },

  header: {
    paddingTop: 50,
    backgroundColor: headerColor,
    height: 100,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },

  headerElements: { fontWeight: "bold", fontSize: 17 },
  headerTitle: { fontSize: 18 },

  doneText: { color: "red" },

  scrollView: {
    marginTop: 15,
    alignItems: "center",
  },

  profilePic: {
    marginTop: 10,
    width: profilePicSize,
    height: profilePicSize,
    borderRadius: profilePicSize / 3.5,
    borderColor: "lightgray",
    borderWidth: 1,
  },

  profilePicLabel: {
    fontSize: 17,
    fontWeight:"bold"
  },

  tapToEdit:{
    fontSize:12
  },

  vstack: {
    marginTop: 30,
  },

  label: {
    marginLeft:20,
    fontSize: 17,
    marginBottom: -13,
    fontWeight:"bold"
  },

  input: {
    fontSize: 17,
    width:"100%"
  },
});
