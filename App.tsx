import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import BottomTabNavigator from "./navigators/BottonTabNavigator";
import LoginContainer from "./feature-login/LoginScreen/LoginContainer";
import HomeScreen from "./feature-home/components/HomeScreen/HomeScreen";
import SignInContainer from "./feature-login/SignInScreen/SignInContainer";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LogIn"
        screenOptions={{
          headerTitle: "",
        }}
      >
        <Stack.Screen name="LogIn" component={LoginContainer} />
        <Stack.Screen name="SignIn" component={SignInContainer} />
        <Stack.Screen name="App" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  app: {
    width: "100%",
  },
});
