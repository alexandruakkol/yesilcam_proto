import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import React, { useState } from "react";
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
import * as ImagePicker from 'expo-image-picker';

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
  let [location, setLocation] = useState();
  let [languages, setLanguages] = useState();
  let [image, setImage] = useState(null);
  let [tooltipVisib, setTooltipVisib] = useState(false);

  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      console.log(result.uri);
    }
  }

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
                navigation.navigate("Cards");
              }}
            >
              <Text style={[styles.doneText, styles.headerElements]}>Done</Text>
            </Button>
          </HStack>

          <ScrollView>
            <View style={styles.scrollView}>
              <Text style={styles.profilePicLabel}>My Photo</Text>
              <TouchableWithoutFeedback onPress={()=>showImagePicker()}>
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/875/875068.png",
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
                  ></Input>
                  <Input
                    style={styles.input}
                    bg={inputColor}
                    w="50%"
                    placeholder="Last name"
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
                            • What are your passions and aspirations?
                            • How do you go about achieveing your goals?"
                  required
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
  tooltip: {
  },

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
