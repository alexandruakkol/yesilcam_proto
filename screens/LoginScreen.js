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
} from "native-base";
import { useFonts, Jost_400Regular } from "@expo-google-fonts/jost";
import { MaterialIcons } from "@expo/vector-icons";

const LoginScreen = () => {
  //hooks
  const [show, setShow] = React.useState(false);

  let [fontsLoaded] = useFonts({
    Jost_400Regular,
  });

  if (!fontsLoaded) {
    return <View />;
  } else {
    return (
      <NativeBaseProvider>
        <KeyboardAvoidingView behaviour="padding" style={styles.loginpage}>
          <Text style={styles.title}>Green Pine Connects</Text>
          <View style={styles.inputContainer}>
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
          </View>

          <Button>Login</Button>
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
    fontFamily: "Jost_400Regular",
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center",
    fontSize: 35,
    marginBottom: 200,
    color: "beige",
  },

  inputContainer: {},

  input: {
    fontSize: 17,
  },
});
