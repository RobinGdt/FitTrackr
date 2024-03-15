import { useState } from "react";
import LoginScreen from "./LoginScreen";
import { LogInFormValues } from "../screen.types";
import { useApi } from "../../useApi/useApi";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const LoginContainer = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const { logInUser } = useApi();

  const onSubmit = async (data: LogInFormValues) => {
    setLoading(true);
    const result = await logInUser(data.email, data.password);
    setLoading(false);
    navigation.navigate("App");
    console.log("User created: ", result);
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
