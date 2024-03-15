import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import BottomTabNavigator from "./navigators/BottonTabNavigator";
import LoginContainer from "./feature-login/LoginScreen/LoginContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignInContainer from "./feature-login/SignInScreen/SignInContainer";
import { UserProvider } from "./data-access/userContext";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");

        if (token) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          console.error("Token undefined");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du token :", error);
      }
    };
    getToken();
  }, []);
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isAuthenticated ? "App" : "Login"}
          screenOptions={{
            headerTitle: "",
          }}
        >
          <Stack.Screen name="LogIn" component={LoginContainer} />
          <Stack.Screen name="SignIn" component={SignInContainer} />
          <Stack.Screen name="App" component={BottomTabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  app: {
    width: "100%",
  },
});
