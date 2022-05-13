import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView, StyleSheet } from "react-native";
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
} from "native-base";

const profilePicSize = 200;
const headerColor = "beige";
const bkgColor = "white";

const ProfileSetup = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <View style={styles.pageContainer}>
        <SafeAreaView>
          <HStack style={styles.header} space={12} justifyContent="center">
            <Center h="10" w="15%" rounded="md" />
            <Center h="10" w="40%" rounded="md">
              <Text style={[styles.headerTitle, styles.headerElements]}>
                Edit profile
              </Text>
            </Center>
            <Button variant="link" bg={headerColor} h="10" w="15%" rounded="md">
              <Text
                style={[styles.doneText, styles.headerElements]}
                onClick={() => {
                  navigation.navigate("Cards");
                }}
              >
                Done
              </Text>
            </Button>
          </HStack>
        </SafeAreaView>

        <View style={styles.profilePicView}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1535786536200-3dd2062ff878?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
            }}
            style={styles.profilePic}
            alt="Profile picture"
          ></Image>
          <Text style={styles.profilePicLabel}>Tap on the picture to edit</Text>

          <VStack style={styles.vstack} space={3}>
            <Text style={styles.label}>About Me</Text>
            <TextArea
              w="350"
              h="95"
              placeholder="Tell us a few words about yourself:
                            • What are your passions and aspirations?
                            • How do you go about achieveing your goals?"
            ></TextArea>

            <Text style={styles.label}>What I offer</Text>
            <TextArea
              w="350"
              h="95"
              placeholder=" • What skills/experience do you want to share with others?
              • What resources, services, or materials are you able to offer?
               "
            ></TextArea>

            <Text style={styles.label}>What I seek</Text>
            <TextArea
              w="350"
              h="95"
              placeholder=" • What do you seek by using this app?
              • What sort of project are you looking for help for?"
            ></TextArea>

            <Text>Located in</Text>
            <Input w="350"></Input>
          </VStack>
        </View>
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
  header: { backgroundColor: headerColor, height: 45 },
  headerElements: { fontWeight: "bold", fontSize: 15 },
  headerTitle: {},

  doneText: {},

  profilePicView: {
    marginTop: 15,
    alignItems: "center",
  },

  profilePic: {
    width: profilePicSize,
    height: profilePicSize,
    borderRadius: profilePicSize / 2,
  },
  vstack: {
    marginTop: 30,
    alignItems: "center",
  },
  label: {
    marginBottom: -5,
  },
});
