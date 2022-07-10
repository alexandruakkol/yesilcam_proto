import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    ActivityIndicator,
  } from "react-native";
  import React, { useState } from "react";
  import {
    NativeBaseProvider,
    Input,
    Button,
    Icon,
    Center,
    Box,
    useToast,
  } from "native-base";
  import { LobsterTwo_700Bold_Italic } from "@expo-google-fonts/lobster-two";
  import { useFonts, Jost_600SemiBold } from "@expo-google-fonts/jost";
  import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
  import { LinearGradient } from "expo-linear-gradient";
  import DateTimePickerModal from "react-native-modal-datetime-picker";
  import { store, retrieve } from "../storage";
  
  const textColor = "#dae8d4c9";
  const CreateAccount2 = ({ route, navigation }) => {
    let [show, setShow] = useState(true);
    let [show2, setShow2] = useState(true);
    const [birthday, setBirthday] = useState();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const toast = useToast();
  
    var dateOptions = { year: "numeric", month: "long", day: "numeric" };
  
    function validateBirthday() {
      if(!birthday)return;
      function getAge(date) {
        var today = new Date();
        var age = today.getFullYear() - date.getFullYear();
        var m = today.getMonth() - date.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
          age--;
        }
        return age;
      }
  
      const id = "toastID";
      if (getAge(birthday) < 18) {
        if (!toast.isActive(id))
          toast.show({
            id,
            description:
              "You need to be at least 18 years old to make an account.",
          });
          return false;
      }else return true;
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
    } else
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
             
            </View>
          </LinearGradient>
        </NativeBaseProvider>
      );
  };
  
  export default CreateAccount2;
  
  const styles = StyleSheet.create({
    appView: {
        height: "100%",
      },
  });
  