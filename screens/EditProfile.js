import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import {
  NativeBaseProvider,
  Center,
  TextArea,
  VStack,
  Image,
  HStack,
  Button,
  Text,
  View,
  ScrollView,
  StatusBar,
  Input,
} from "native-base";
import { useFonts, Jost_600SemiBold } from "@expo-google-fonts/jost";
import Tooltip from "react-native-walkthrough-tooltip";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { store, retrieve } from "../storage";
import { appendUserData, storePicture } from "../firebase";

const profilePicSize = 200;
const headerColor = "#ffffff";
const bkgColor = "#ebecf0";
const inputColor = "white";

const ProfileSetup = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Jost_600SemiBold,
  });

  let [firstName, setFirstName] = useState();
  let [lastName, setLastName] = useState();
  let [aboutme, setAboutme] = useState();
  let [offer, setOffer] = useState();
  let [seek, setSeek] = useState();
  let [profession, setProfession] = useState();
  let [experience, setExperience] = useState();
  let [location, setLocation] = useState();
  let [languages, setLanguages] = useState();
  let [image, setImage] = useState(
    "https://cdn-icons-png.flaticon.com/512/875/875068.png"
  );
  let [tooltipVisib, setTooltipVisib] = useState(false);

  useEffect(() => {
    retrieve("usrData_name").then((r) => setFirstName(r));
    retrieve("usrData_surname").then((r) => setLastName(r));
    retrieve("usrData_aboutme").then((r) => {
      if (r != "null") setAboutme(r);
    });
    retrieve("usrData_offer").then((r) => {
      if (r != "null") setOffer(r);
    });
    retrieve("usrData_seek").then((r) => {
      if (r != "null") setSeek(r);
    });
    retrieve("usrData_profession").then((r) => {
      if (r != "null") setProfession(r);
    });
    retrieve("usrData_experience").then((r) => {
      if (r != "null") setExperience(r);
    });
    retrieve("usrData_location").then((r) => {
      if (r != "null") setLocation(r);
    });
    retrieve("usrData_languages").then((r) => {
      if (r != "null") setLanguages(r);
    });
  }, []);

  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      console.log(result.uri);
      setImage(result.uri);
      storePicture(result.uri);
      return;
    }
  };

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
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
                //write to db
                let toSend = {
                  aboutme,
                  offer,
                  seek,
                  profession,
                  experience,
                  location,
                  languages,
                };
                console.log("to send: ", toSend);
                appendUserData(toSend);
                //write to asyncstorage
                navigation.navigate("Cards");
              }}
            >
              <Text style={[styles.doneText, styles.headerElements]}>Done</Text>
            </Button>
          </HStack>

          <ScrollView>
            <View style={styles.scrollView}>
              <Text style={styles.profilePicLabel}>My Photo</Text>
              <TouchableWithoutFeedback onPress={() => showImagePicker()}>
                <Image
                  source={{
                    uri: image,
                  }}
                  style={styles.profilePic}
                  alt="Profile picture"
                ></Image>
              </TouchableWithoutFeedback>
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
                    required
                    defaultValue={firstName}
                    disabled
                  ></Input>
                  <Input
                    style={styles.input}
                    bg={inputColor}
                    w="50%"
                    placeholder="Last name"
                    defaultValue={lastName}
                    required
                    disabled
                  ></Input>
                </HStack>

                <View>
                  <Text style={styles.label}>About Me</Text>
                </View>

                <TextArea
                  style={styles.input}
                  bg={inputColor}
                  h="95"
                  placeholder="Tell us a few words about yourself:
                            • What are your passions, interests and aspirations?
                            • How do you go about achieveing your goals?"
                  required
                  defaultValue={aboutme}
                  onChange={(e) => {
                    setAboutme(e.target.value);
                  }}
                ></TextArea>

                <Text style={styles.label}>What I offer</Text>
                <TextArea
                  style={styles.input}
                  bg={inputColor}
                  h="95"
                  placeholder=" • What skills/experience do you want to share with others?
              • What resources, services, or materials are you able to offer?
               "
                  defaultValue={offer}
                  onChange={(e) => setOffer(e.target.value)}
                ></TextArea>

                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.label}>What I seek (optional) </Text>
                  <View style={styles.tooltip}>
                    <Tooltip
                      isVisible={tooltipVisib}
                      content={
                        <Text>
                          At GPF, we know how difficult it is to make an
                          independent film and we strive to connect Film and TV
                          professionals who can offer assistance without
                          necessarily expecting a return. Hence this field is
                          entirely optional
                        </Text>
                      }
                      placement="top"
                      onClose={() => setTooltipVisib(false)}
                    >
                      <TouchableWithoutFeedback
                        style={styles.touchable}
                        onPress={() => setTooltipVisib(true)}
                      >
                        <FontAwesome
                          name="question-circle"
                          size={20}
                        ></FontAwesome>
                      </TouchableWithoutFeedback>
                    </Tooltip>
                  </View>
                </View>
                <TextArea
                  style={styles.input}
                  bg={inputColor}
                  h="95"
                  placeholder=" • What do you seek by using this app?
              • What sort of project are you looking for help for?"
                  defaultValue={seek}
                  onChange={(e) => setSeek(e.target.value)}
                ></TextArea>

                <Text style={styles.label}>Profession</Text>
                <Input
                  style={styles.input}
                  bg={inputColor}
                  h="12"
                  placeholder="Add profession"
                  defaultValue={profession}
                  onChange={(e) => setProfession(e.target.value)}
                ></Input>
                <Text style={styles.label}>Years of experience</Text>
                <Input
                  style={styles.input}
                  bg={inputColor}
                  h="12"
                  w="15%"
                  placeholder="ex.2"
                  defaultValue={experience}
                  onChange={(e) => setExperience(e.target.value)}
                ></Input>

                <Text style={styles.label}>Located in</Text>
                <Input
                  style={styles.input}
                  bg={inputColor}
                  h="12"
                  placeholder="ex. San Diego, CA"
                  defaultValue={location}
                  onChange={(e) => setLocation(e.target.value)}
                ></Input>

                <Text style={styles.label}>Languages I speak</Text>
                <Input
                  style={styles.input}
                  bg={inputColor}
                  h="12"
                  placeholder="Add language"
                  defaultValue={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                ></Input>
                <View h="10"></View>
              </VStack>
            </View>
          </ScrollView>
        </View>
      </NativeBaseProvider>
    );
  }
};

export default ProfileSetup;

const styles = StyleSheet.create({
  pageContainer: {
    height: "100%",
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
    fontWeight: "bold",
  },
  tooltip: {},

  tapToEdit: {
    fontSize: 12,
  },

  vstack: {
    marginTop: 30,
  },

  label: {
    marginLeft: 20,
    fontSize: 17,
    marginBottom: -13,
    fontWeight: "bold",
  },

  input: {
    fontFamily: "Jost_600SemiBold",
    fontSize: 17,
    width: "100%",
  },
});
