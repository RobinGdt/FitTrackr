import { useState } from "react";
import LoginScreen from "./LoginScreen";
import { LogInFormValues } from "../screen.types";
import { useApi } from "../../useApi/useApi";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginContainer = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const { logInUser } = useApi();

  const onSubmit = async (data: LogInFormValues) => {
    setLoading(true);
    try {
      const result = await logInUser(data.email, data.password);
      const userJson = JSON.stringify(result);
      await AsyncStorage.setItem("userToken", userJson);
      setLoading(false);
      navigation.navigate("App");
      console.log("User Token: ", result);
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setLoading(false);
    }
  };

  return (
    <LoginScreen
      onSubmit={onSubmit}
      loading={loading}
      navigation={navigation}
    />
  );
};

export default LoginContainer;
