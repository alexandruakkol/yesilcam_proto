//import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import { NativeBaseProvider, Input, Button, Icon, Center } from "native-base";
import { LobsterTwo_700Bold_Italic } from "@expo-google-fonts/lobster-two";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const textColor = "#dae8d4c9";
const ForgotPassword = ({ navigation }) => {
  let [recoveryEmail, setRecoveryEmail] = useState();

  return (
    <NativeBaseProvider>
      <LinearGradient
        // Background Linear Gradient
        colors={["#c4791c", "#0c5407"]}
        start={{ x: 1.75, y: 0.75 }}
        end={{ x: 0.5, y: 0.98 }}
        style={{height:'100%'}}
      >
        <View style={styles.appView}>
          <Text style={styles.title}>Green Pine Connects</Text>

          <KeyboardAvoidingView behavior="padding">
            <Text style={styles.loginText}>What is your account's email?</Text>

            <Input
              style={styles.input}
              variant="underlined"
              size="2xl"
              mx="4"
              placeholder="Email"
              value={recoveryEmail}
              onChangeText={(recoveryEmail) => {
                setRecoveryEmail(recoveryEmail);
              }}
            ></Input>

            <Center>
              <Button
                style={styles.btn}
                bg="red.800"
                w="190"
                h="10"
                borderRadius="20"
                onPress={() => {
                    
                  
                }}
              >
                <Text style={styles.btnText}>Confirm</Text>
              </Button>
            </Center>
          </KeyboardAvoidingView>
        </View>
      </LinearGradient>
    </NativeBaseProvider>
  );
};

export default ForgotPassword;

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
  input: {
    height: 60,
  },
  loginText: {
    fontFamily: "Jost_600SemiBold",
    color: textColor,
    fontSize: 27,
    textAlign: "left",
    marginBottom: 25,
    paddingLeft: 15,
  },
  btn: {
    marginTop: 100,
  },
  btnText: {
    color: textColor,
    fontSize: 16,
  },
  appView: {
    height: "100%",
  },
});
