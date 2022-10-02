import {
  auth,
  createUser,
  getAndGlobalizeUsrData,
  writeToDB,
  checkAuth,
  getPictureOfUser,
} from "../firebase";
import { store, retrieve } from "../storage";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { NativeBaseProvider, Input, Button, Icon, Center } from "native-base";
import { useFonts, Jost_600SemiBold } from "@expo-google-fonts/jost";
import { LobsterTwo_700Bold_Italic } from "@expo-google-fonts/lobster-two";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Application from "expo-application";
import { onAuthStateChanged } from "firebase/auth";
import GPC, { clearGPC } from "../global";
import AsyncStorage from "@react-native-async-storage/async-storage";

const textColor = "#dae8d4c9";

const LoginScreen = ({ navigation }) => {
  //---------//TESTING AREA//-----------\\

  //------------------------------------//
  //hooks
  useEffect((GPC) => {
    console.log("App starting");
    GPC = {};
    AsyncStorage.clear();

    //auto-login with session
    onAuthStateChanged(auth, (user) => {
      if (user) {
        handleLogin();
      } else {
        console.log("user not signed in");
      }
    });
  }, []);

  let [show, setShow] = useState(true);
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("registered with", user.email);
      })
      .catch((error) => {
        console.log("badSignup: ", error.message);
        alert("Invalid signup");
      });
  };

  function handleLogin() {
    getAndGlobalizeUsrData().then(() => {
      navigation.navigate("Cards");
    });
  }

  async function handleLogInWithEmailAndPassword() {
    await auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("logged in with", user.email);
        handleLogin();
      })
      .catch((error) => {
        console.log("badLogin: ", error.message);
        alert("Invalid login");
      });
  }

  let [fontsLoaded] = useFonts({
    Jost_600SemiBold,
    LobsterTwo_700Bold_Italic,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.LoadingContainer}>
        <ActivityIndicator color="#0c5407" />
      </View>
    );
  } else {
    return (
      <NativeBaseProvider>
        <LinearGradient
          // Background Linear Gradient
          colors={["#c4791c", "#0c5407"]}
          start={{ x: 1.75, y: 0.75 }}
          end={{ x: 0.5, y: 0.98 }}
          style={styles.loginpage}
        >
          <Text style={styles.title}>Green Pine Connects</Text>
          <Text style={styles.subtitle1}>
            A global application to increase resources for Film and TV
            professionals{" "}
          </Text>
          <Text style={styles.subtitle2}>By the Green Pine Foundation</Text>
          <KeyboardAvoidingView behavior="padding">
            <View>
              <Text style={styles.loginText}>Log in</Text>
              <Input
                style={styles.input}
                variant="underlined"
                size="2xl"
                mx="4"
                placeholder="Email"
                value={email}
                onChangeText={(email) => {
                  setEmail(email.toLowerCase());
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
                defaultValue={password}
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
              <Text
                style={styles.forgotPass}
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                Forgot password?
              </Text>
            </View>

            <Center>
              <Button
                bg="red.800"
                w="190"
                h="10"
                borderRadius="20"
                onPress={() => {
                  if (email && password) {
                    handleLogInWithEmailAndPassword();
                  }
                }}
              >
                <Text style={styles.loginButton}>Log in</Text>
              </Button>
            </Center>

            <View style={styles.lineContainer}>
              <View style={styles.line} />
              <Text style={styles.lineText}>or</Text>
              <View style={styles.line} />
            </View>

            <Center>
              <Button
                startIcon={
                  <FontAwesome
                    style={styles.loginWithGoogleIcon}
                    name="apple"
                    size={18}
                    color="white"
                  />
                }
                style={styles.loginWithAppleButton}
                bg="black"
                w="240"
                h="10"
                borderRadius="20"
              >
                <Text style={styles.loginWithAppleText}>Log in with Apple</Text>
              </Button>
            </Center>

            <Center>
              <Button
                title="Google Sign-In"
                startIcon={
                  <FontAwesome
                    style={styles.loginWithGoogleIcon}
                    name="google"
                    size={18}
                  />
                }
                style={styles.loginWithGoogleButton}
                bg="white"
                w="240"
                h="10"
                marginTop="3"
                borderRadius="20"
                onPress={() =>
                  onGoogleButtonPress().then(() =>
                    console.log("Signed in with Google!")
                  )
                }
              >
                <Text style={styles.loginWithGoogleText}>
                  Log in with Google
                </Text>
              </Button>
            </Center>

            <View>
              <Center>
                <Text style={styles.newHere}>
                  New here?{" "}
                  <Text
                    style={styles.createAccountText}
                    onPress={() => navigation.navigate("CreateAccount")}
                  >
                    Create an account
                  </Text>
                </Text>
              </Center>
            </View>
          </KeyboardAvoidingView>
        </LinearGradient>
      </NativeBaseProvider>
    );
  }
};

export default LoginScreen;

const styles = StyleSheet.create({
  LoadingContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },

  loginpage: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center",
  },

  title: {
    fontFamily: "LobsterTwo_700Bold_Italic",
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center",
    fontSize: 39,
    marginTop: 75,
    color: textColor,
  },
  subtitle1: {
    fontFamily: "Jost_600SemiBold",
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center",
    fontSize: 16,
    color: textColor,
    marginHorizontal: 5,
    marginTop: 35,
    marginBottom: 15,
  },
  subtitle2: {
    fontFamily: "Jost_600SemiBold",
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center",
    fontSize: 14,
    color: textColor,
    marginHorizontal: 5,
    marginBottom: 100,
  },

  loginText: {
    fontFamily: "Jost_600SemiBold",
    color: textColor,
    fontSize: 27,
    textAlign: "left",
    marginBottom: 25,
    paddingLeft: 15,
  },

  input: {
    fontSize: 17,
    color: textColor,
  },

  forgotPass: {
    color: textColor,
    textDecorationLine: "underline",
    textAlign: "right",
    marginRight: 15,
    marginBottom: 30,
  },

  loginButton: {
    color: textColor,
    fontSize: 16,
  },

  lineContainer: {
    marginVertical: 15,
    flexDirection: "row",
  },

  line: {
    backgroundColor: textColor,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },

  lineText: {
    color: textColor,
    alignSelf: "center",
    paddingHorizontal: 5,
    fontSize: 14,
  },

  loginWithAppleButton: {},

  loginWithAppleText: {
    color: textColor,
    fontSize: 16,
  },

  loginWithGoogleIcon: { marginTop: 2 },
  loginWithGoogleText: {
    color: "black",
    fontSize: 16,
  },

  newHere: {
    marginTop: 3,
    marginBottom: -50,
    color: textColor,
    fontSize: 13,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  createAccountText: {
    textDecorationLine: "underline",
  },
});
