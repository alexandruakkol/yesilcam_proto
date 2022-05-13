import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import React from "react";
import {
  NativeBaseProvider,
  Input,
  Button,
  KeyboardAvoidingView,
  Icon,
  Center,
  Text,
  Box,
} from "native-base";
import { useFonts, Jost_600SemiBold } from "@expo-google-fonts/jost";
import { LobsterTwo_700Bold_Italic } from "@expo-google-fonts/lobster-two";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

const textColor = "beige";

const LoginScreen = () => {
  //hooks
  const [show, setShow] = React.useState(false);

  let [fontsLoaded] = useFonts({
    Jost_600SemiBold,
    LobsterTwo_700Bold_Italic,
  });

  if (!fontsLoaded) {
    return <View>Loading</View>;
  } else {
    return (
      <NativeBaseProvider>
        <KeyboardAvoidingView behaviour="padding" style={styles.loginpage}>
          <Text style={styles.title}>Green Pine Connects</Text>
          <Box>
            <Text style={styles.loginText}>Log in</Text>
            <Input
              style={styles.input}
              variant="underlined"
              size="2xl"
              mx="4"
              placeholder="Email"
            ></Input>
            <Input
              secureTextEntry
              variant="underlined"
              style={styles.input}
              mx="4"
              marginTop="5"
              marginBottom="4"
              size="2xl"
              type={show ? "text" : "password"}
              InputRightElement={
                <Icon
                  as={
                    <MaterialIcons
                      name={show ? "visibility" : "visibility-off"}
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                  onPress={() => setShow(!show)}
                />
              }
              placeholder="Password"
            ></Input>
            <Text style={styles.forgotPass}>Forgot password?</Text>
          </Box>

          <Center flex={0.25}>
            <Button bg="red.800" w="190" h="10" borderRadius="20">
              <Text
                style={styles.loginButton}
                onClick={() => {
                  window.location.href = "details.html";
                }}
              >
                Log in
              </Text>
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
              w="250"
              h="9"
              borderRadius="20"
            >
              <Text style={styles.loginWithAppleText}>Log in with Apple</Text>
            </Button>
          </Center>

          <Center>
            <Button
              startIcon={
                <FontAwesome
                  style={styles.loginWithGoogleIcon}
                  name="google"
                  size={18}
                />
              }
              style={styles.loginWithGoogleButton}
              bg="white"
              w="250"
              h="9"
              marginTop="3"
              borderRadius="20"
            >
              <Text style={styles.loginWithGoogleText}>Log in with Google</Text>
            </Button>
          </Center>

          <View>
            <Text style={styles.newHere}>
              New here?{" "}
              <Text style={styles.createAccountText}>Create an account</Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </NativeBaseProvider>
    );
  }
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginpage: {
    backgroundColor: "#446a4b",
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center",
  },

  title: {
    fontFamily: "  LobsterTwo_700Bold_Italic",
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center",
    fontSize: 35,
    marginBottom: 150,
    marginTop: 60,
    color: textColor,
  },

  loginText: {
    fontFamily: " Jost_600SemiBold",
    color: textColor,
    fontSize: 26,
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
    flex: 0.5,
    color: textColor,
    fontSize: 16,
  },

  loginWithGoogleIcon: { marginTop: 2 },
  loginWithGoogleText: {
    color: "black",
    fontSize: 16,
  },

  newHere: {
    marginTop: 15,
    marginBottom: -100,
    color: textColor,
    fontSize: 13,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  createAccountText: {
    textDecorationLine: "underline",
  },
});
