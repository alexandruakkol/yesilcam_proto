import { StyleSheet, Text, View, KeyboardAvoidingView,TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { NativeBaseProvider, Input, Button, Icon, Center, Box } from "native-base";
import { LobsterTwo_700Bold_Italic } from "@expo-google-fonts/lobster-two";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const textColor = "#dae8d4c9";
const CreateAccount2 = ({ navigation }) => { 
  let [show, setShow] = useState(true);
  let [show2, setShow2] = useState(true);
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
  let [password2, setPassword2] = useState();
  const [birthday, setBirthday] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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
            <Text style={styles.loginText}>What is your birthday?</Text>
            <TouchableOpacity onPress={() => {setDatePickerVisibility(true)}}>
            <Box alignSelf="center" bg="primary.500">
            <Text>{birthday ? birthday.toString() : "Choose your birthday"}</Text>
            </Box>
            </TouchableOpacity>
            
           
            <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={(date) => {
          setBirthday(date);
          console.warn("A date has been picked: ", date);
          setDatePickerVisibility(false);
        }}
        onCancel={() => {
          setDatePickerVisibility(false);
        }}
      />
            <Center>
              <Button
                bg="red.800"
                w="190"
                h="10"
                borderRadius="20"
                onPress={() => {
                  if (email && password) {
                    handleLogIn();
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

export default CreateAccount2;

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
