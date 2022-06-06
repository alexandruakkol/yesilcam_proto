import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import { NativeBaseProvider, Input, Button, Icon, Center } from "native-base";
import { LobsterTwo_700Bold_Italic } from "@expo-google-fonts/lobster-two";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const textColor = "#dae8d4c9";
const CreateAccount = ({ navigation }) => {
  let [show, setShow] = useState(true);
  let [show2, setShow2] = useState(true);
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
  let [password2, setPassword2] = useState();

  return (
    <NativeBaseProvider>
      <LinearGradient
        // Background Linear Gradient
        colors={["#c4791c", "#0c5407"]}
        start={{ x: 1.75, y: 0.75 }}
        end={{ x: 0.5, y: 0.98 }}
        style={styles.loginpage}
      >
        <View style={styles.appView}>
          <Text style={styles.title}>Green Pine Connects</Text>

          <KeyboardAvoidingView behavior="padding">
            <Text style={styles.loginText}>Sign up</Text>

            <Input
              style={styles.input}
              variant="underlined"
              size="2xl"
              mx="4"
              placeholder="Email"
              value={email}
              onChangeText={(email) => {
                setEmail(email);
              }}
            ></Input>

            <Input
              secureTextEntry={show}
              variant="underlined"
              style={styles.input}
              mx="4"
              marginTop="5"
              marginBottom="4"
              size="2xl"
              value={password}
              onChangeText={(password) => {
                setPassword(password);
              }}
              InputRightElement={
                <Icon
                  as={
                    <MaterialIcons
                      name={show ? "visibility-off" : "visibility"}
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                  onPress={() => {
                    setShow(!show);
                  }}
                />
              }
              placeholder="Password"
            ></Input>

            <Input
              secureTextEntry={show2}
              variant="underlined"
              style={styles.input}
              mx="4"
              marginTop="5"
              marginBottom="4"
              size="2xl"
              value={password2}
              onChangeText={(password2) => {
                setPassword2(password2);
              }}
              InputRightElement={
                <Icon
                  as={
                    <MaterialIcons
                      name={show2 ? "visibility-off" : "visibility"}
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                  onPress={() => {
                    setShow2(!show2);
                  }}
                />
              }
              placeholder="Retype password"
            ></Input>

            <Center>
              <Button
                bg="red.800"
                w="190"
                h="10"
                borderRadius="20"
                onPress={() => {
                  if (email && password) {
                    navigation.navigate("CreateAccount2");
                  }
                }}
              >
                <Text style={styles.loginButton}>Sign Up</Text>
              </Button>
            </Center>
          </KeyboardAvoidingView>
        </View>
      </LinearGradient>
    </NativeBaseProvider>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  title: {
    fontFamily: "LobsterTwo_700Bold_Italic",
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center",
    fontSize: 39,
    marginBottom: 150,
    marginTop: 100,
    color: textColor,
  },
  loginText: {
    fontFamily: "Jost_600SemiBold",
    color: textColor,
    fontSize: 27,
    textAlign: "left",
    marginBottom: 25,
    paddingLeft: 15,
  },
  loginButton: {
    color: textColor,
    fontSize: 16,
  },
});
