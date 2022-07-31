import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import EditProfile from "./screens/EditProfile";
import Cards from "./screens/Cards";
import { NativeBaseProvider } from "native-base";
import CreateAccount from "./screens/CreateAccount";
import CreateAccount2 from "./screens/CreateAccount2";
import CreateAccount3 from "./screens/CreateAccount3";
import ForgotPassword from "./screens/ForgotPassword";
import Chat from "./screens/Chat";
import Community from "./screens/Community";
import Navbar from "./components/Navbar";
import Conversation from "./screens/Conversation";
import Settings from "./screens/Settings";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="LoginScreen"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Chat"
            component={Chat}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Cards"
            component={Cards}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Conversation"
            component={Conversation}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="EditProfile"
            component={EditProfile}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Community"
            component={Community}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Navbar"
            component={Navbar}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="CreateAccount"
            component={CreateAccount}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Settings"
            component={Settings}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="CreateAccount2"
            component={CreateAccount2}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="ForgotPassword"
            component={ForgotPassword}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="CreateAccount3"
            component={CreateAccount3}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({});
