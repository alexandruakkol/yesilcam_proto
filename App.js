import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import EditProfile from "./screens/EditProfile";
import Cards from "./screens/Cards";
import { NativeBaseProvider } from "native-base";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Cards"
            component={Cards}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="EditProfile"
            component={EditProfile}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({});
