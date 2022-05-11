import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
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
} from "native-base";
import { useFonts, Jost_600SemiBold } from "@expo-google-fonts/jost";
import { MaterialIcons } from "@expo/vector-icons";

const textColor = "beige";

const LoginScreen = () => {
  //hooks
  const [show, setShow] = React.useState(false);

  let [fontsLoaded] = useFonts({
    Jost_600SemiBold,
  });

  if (!fontsLoaded) {
    return <View />;
  } else {
    return (
      <NativeBaseProvider>
        <KeyboardAvoidingView behaviour="padding" style={styles.loginpage}>
          <Text style={styles.title}>Green Pine Connects</Text>
          <View style={styles.inputContainer}>
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
          </View>

          <Center flex={0.1}>
            <Button colorScheme="rose" w="190" borderRadius="20">
              <Text style={styles.loginButton}>Log in</Text>
            </Button>
          </Center>

          <View style={styles.lineContainer}>
            <View style={styles.line}>
              <hr width="100%" color={textColor}></hr>
            </View>

            <Text style={styles.lineText}>or</Text>

            <View style={styles.line}>
              <hr width="100%" color={textColor}></hr>
            </View>
          </View>
        </KeyboardAvoidingView>
      </NativeBaseProvider>
    );
  }
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginpage: {
    backgroundColor: "#32522f",
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center",
  },
  title: {
    fontFamily: " Jost_600SemiBold",
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center",
    fontSize: 35,
    marginBottom: 130,
    color: textColor,
  },

  inputContainer: {},

  loginText: {
    fontFamily: " Jost_600SemiBold",
    color: textColor,
    fontSize: 28,
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
    marginTop: 45,
    flexDirection: "row",
  },

  line: {
    marginLeft: 12,
    marginRight: 12,
    flex: 0.44,
    justifyContent: "center",
  },

  lineText: {
    color: textColor,
    fontSize: 13,
    justifyContent: "center",
    flex: 0.12,
  },
});
