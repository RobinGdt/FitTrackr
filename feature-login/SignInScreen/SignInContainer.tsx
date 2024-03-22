import { useState } from "react";
import SignInScreen from "./SignInScreen";
import { SignInFormValues } from "../screen.types";
import { useApi } from "../../useApi/useApi";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const SignInContainer = () => {
  const [isCreated, setIsCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const { addNewUser } = useApi();

  const onSubmit = async (data: SignInFormValues) => {
    setLoading(true);
    const result = await addNewUser(
      data.email,
      data.password,
      data.firstname,
      data.lastname,
      data.phone,
      data.weight,
      data.size,
      data.imgUrl
    );
    setIsCreated(true);
    setLoading(false);
    console.log("User created: ", result);
  };

  return (
    <SignInScreen
      onSubmit={onSubmit}
      isCreated={isCreated}
      loading={loading}
      navigation={navigation}
    />
  );
};

export default SignInContainer;
