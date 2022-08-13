import { StyleSheet, Text } from "react-native";
import React from "react";
import { NativeBaseProvider, Center, HStack, View, Button } from "native-base";
import {
  useFonts,
  LobsterTwo_700Bold_Italic,
} from "@expo-google-fonts/lobster-two";
import { useRoute } from "@react-navigation/native";
import { appendUserData } from "../firebase";
import GPC from "../global";
const headerColor = "white";

//for EditProfile submit
const ConditionalDoneButton = (props) => {
  if (props.page != "editProfile") return <View></View>;
  return (
    <Button
      style={styles.button}
      variant="link"
      bg={headerColor}
      h="10"
      w="25%"
      onPress={() => {
        //write to db
        if (props.image) storePicture(props.image);
        console.log("to send: ", props.data);
        appendUserData(props.data).then(props.navigation.navigate("Cards"));
        Object.keys(props.data).forEach((key) => {
          GPC["usrData_" + key] = props.data[key]; //temp assignment to global until async server is complete
        });
      }}
    >
      <Text style={[styles.doneText, styles.headerElements]}>Save</Text>
    </Button>
  );
};

const Header = (props) => {
  const route = useRoute();
  let [fontsLoaded] = useFonts({
    LobsterTwo_700Bold_Italic,
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <HStack style={styles.header} space={12} justifyContent="center">
        <Center h="10" w="70%">
          <Text style={[styles.headerTitle, styles.headerElements]}>
            Green Pine Connects
          </Text>
          <Text style={[styles.headerSubTitle, styles.headerElements]}>
            {route.name === "Cards" ? "" : route.name}
          </Text>
          <ConditionalDoneButton
            page={props.page}
            data={props.data}
            navigation={props.navigation}
          ></ConditionalDoneButton>
        </Center>
      </HStack>
    );
  }
};

export default Header;

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    backgroundColor: headerColor,
    height: 110,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },
  headerElements: { fontWeight: "bold" },
  headerTitle: {
    fontFamily: "LobsterTwo_700Bold_Italic",
    fontSize: 25,
    color: "darkgreen",
  },
  headerSubTitle: {
    fontFamily: "LobsterTwo_700Bold_Italic",
    fontSize: 17,
    color: "darkgreen",
  },
  button: {
    marginTop: -40,
    marginLeft: 310,
  },
  doneText: {
    color: "darkgreen",
    fontSize: 18,
    fontFamily: "LobsterTwo_700Bold_Italic",
  },
});
