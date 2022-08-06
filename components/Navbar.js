import { StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { NativeBaseProvider, Center, HStack, View, VStack } from "native-base";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const Navbar = ({ navigation }) => {
  return (
    <View style={styles.navbar}>
      <NativeBaseProvider>
        <HStack justifyContent="center">
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("EditProfile")}
          >
            <View style={styles.navButton} w="20%" rounded="md" shadow={3}>
              <VStack>
                <View h="3"></View>
                <Center style={styles.icon}>
                  <FontAwesome
                    style={styles.loginWithGoogleIcon}
                    name="user-o"
                    size={19}
                    color="grey"
                  />
                </Center>
              </VStack>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => navigation.navigate("Chat")}>
            <View style={styles.navButton} w="20%" rounded="md" shadow={3}>
              <VStack>
                <View h="3"></View>
                <Center style={styles.icon}>
                  <Ionicons
                    style={styles.loginWithGoogleIcon}
                    name="ios-chatbox-outline"
                    size={19}
                    color="grey"
                  />
                </Center>
              </VStack>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Cards")}
          >
            <View style={styles.navButton} w="20%" rounded="md" shadow={3}>
              <VStack>
                <View h="3"></View>
                <Center style={styles.icon}>
                  <FontAwesome
                    style={styles.loginWithGoogleIcon}
                    name="bars"
                    size={19}
                    color="grey"
                  />
                </Center>
              </VStack>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Community")}
          >
            <View style={styles.navButton} w="20%" rounded="md" shadow={3}>
              <VStack>
                <View h="3"></View>
                <Center style={styles.icon}>
                  <FontAwesome
                    style={styles.loginWithGoogleIcon}
                    name="users"
                    size={19}
                    color="grey"
                  />
                </Center>
              </VStack>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Settings")}
          >
            <View style={styles.navButton} w="20%" rounded="md" shadow={3}>
              <VStack>
                <View h="3"></View>
                <Center style={styles.icon}>
                  <FontAwesome
                    style={styles.loginWithGoogleIcon}
                    name="gear"
                    size={19}
                    color="grey"
                  />
                </Center>
              </VStack>
            </View>
          </TouchableWithoutFeedback>
        </HStack>
      </NativeBaseProvider>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  navbar: {
    height: "7.5%",
    backgroundColor: "white",
  },
  navButton: {
    height: "600%",
    borderWidth: "0.4",
    borderColor:'lightgrey'
  },
});
