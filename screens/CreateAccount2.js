//Birthday input screen
import { StyleSheet, Text, View, KeyboardAvoidingView,TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { NativeBaseProvider, Input, Button, Icon, Center, Box } from "native-base";
import { LobsterTwo_700Bold_Italic } from "@expo-google-fonts/lobster-two";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const textColor = "#dae8d4c9";
const CreateAccount2 = ({ route, navigation }) => { 
  let [show, setShow] = useState(true);
  let [show2, setShow2] = useState(true);
  const [birthday, setBirthday] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  var dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
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
            <Center><Text style={styles.question}>What is your birthday?</Text></Center>
            <TouchableWithoutFeedback onPress={() => {setDatePickerVisibility(true)}}>
            <View alignSelf="center" bg="primary.500" style={styles.bdayBox}>
            <Center>
              <Text style={styles.bdayText}>
              {birthday ? birthday.toLocaleDateString("en-US", dateOptions) : "Choose your birthday"}
              </Text></Center>
            </View>
            </TouchableWithoutFeedback>
            
           
            <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={(date) => {
          setBirthday(date);
          setDatePickerVisibility(false);
        }}
        onCancel={() => {
          setDatePickerVisibility(false);
        }}
      />
            <Center>
              <Button
                bg="red.800"
                w="230"
                h="10"
                borderRadius="20"
                onPress={() => {
                  
                   navigation.navigate('CreateAccount3',
                   {email:(route.params.email),
                    password:(route.params.password),
                    birthday:birthday
                  });
                }}
              >
                <Text style={styles.confirmTxt}
            
                >Confirm</Text>
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
  question: {
    paddingTop:40,
    fontFamily: "Jost_600SemiBold",
    color: textColor,
    fontSize: 27,
    textAlign: "left",
    marginBottom: 25,
    paddingLeft: 15,
  },
  bdayBox:{
    marginTop:30,
    height:45,
    width:400,
    backgroundColor:'lightgrey',
    borderRadius:12,
    marginBottom:80
  },
  bdayText:{
    fontSize:35
  },
  confirmTxt: {
    color: textColor,
    fontSize: 16,
  },
  appView:{
    height:'100%'
  }
});
