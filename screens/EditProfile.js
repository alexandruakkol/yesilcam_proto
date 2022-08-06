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
import Header from "../components/Header";
import {
  appendUserData,
  storePicture,
  getPictureOfUser,
  auth,
  getAndGlobalizeUsrData,
} from "../firebase";
import Navbar from "../components/Navbar";
import GPC from "../global";

const profilePicSize = 200;
const headerColor = "#ffffff";
const bkgColor = "#ebecf0";
const inputColor = "white";

const ProfileSetup = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Jost_600SemiBold,
  });

  let [firstName, setFirstName] = useState(
    GPC["usrData_firstName"] ? GPC["usrData_firstName"] : ""
  );
  let [lastName, setLastName] = useState(
    GPC["usrData_lastName"] ? GPC["usrData_lastName"] : ""
  );
  let [aboutme, setAboutme] = useState(
    GPC["usrData_aboutme"] ? GPC["usrData_aboutme"] : ""
  );
  let [offer, setOffer] = useState(
    GPC["usrData_offer"] ? GPC["usrData_offer"] : null
  );
  let [seek, setSeek] = useState(
    GPC["usrData_seek"] ? GPC["usrData_seek"] : null
  );
  let [profession, setProfession] = useState(
    GPC["usrData_profession"] ? GPC["usrData_profession"] : null
  );
  let [experience, setExperience] = useState(
    GPC["usrData_experience"] ? GPC["usrData_experience"] : null
  );
  let [location, setLocation] = useState(
    GPC["usrData_location"] ? GPC["usrData_location"] : null
  );
  let [languages, setLanguages] = useState(
    GPC["usrData_languages"] ? GPC["usrData_languages"] : null
  );
  let [image, setImage] = useState(
    GPC["usrData_profilePicture"]
      ? GPC["usrData_profilePicture"]
      : "https://cdn-icons-png.flaticon.com/512/875/875068.png"
  );
  let [tooltipVisib, setTooltipVisib] = useState(false);

  useEffect(() => {
    getAndGlobalizeUsrData().then(() => {
      console.log("GPC", GPC);
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
      setImage(result.uri);
      return;
    } else {
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
        <Header
          page="editProfile"
          data={{
            aboutme,
            offer,
            seek,
            profession,
            experience,
            location,
            languages,
            image,
          }}
          navigation={navigation}
        ></Header>
        <View style={styles.pageContainer}>
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
                  onChangeText={(e) => {
                    setAboutme(e);
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
                  onChangeText={(e) => setOffer(e)}
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
                  onChangeText={(e) => setSeek(e)}
                ></TextArea>

                <Text style={styles.label}>Profession</Text>
                <Input
                  style={styles.input}
                  bg={inputColor}
                  h="12"
                  placeholder="Add profession"
                  defaultValue={profession}
                  onChangeText={(e) => setProfession(e)}
                ></Input>
                <Text style={styles.label}>Years of experience</Text>
                <Input
                  style={styles.input}
                  bg={inputColor}
                  h="12"
                  w="15%"
                  placeholder="ex.2"
                  defaultValue={experience}
                  onChangeText={(e) => setExperience(e)}
                ></Input>

                <Text style={styles.label}>Located in</Text>
                <Input
                  style={styles.input}
                  bg={inputColor}
                  h="12"
                  placeholder="ex. San Diego, CA"
                  defaultValue={location}
                  onChangeText={(e) => setLocation(e)}
                ></Input>

                <Text style={styles.label}>Languages I speak</Text>
                <Input
                  style={styles.input}
                  bg={inputColor}
                  h="12"
                  placeholder="Add language"
                  defaultValue={languages}
                  onChangeText={(e) => setLanguages(e)}
                ></Input>
                <View h="10"></View>
              </VStack>
            </View>
          </ScrollView>
          <Navbar navigation={navigation}></Navbar>
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
