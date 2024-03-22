import {
  StyleSheet,
  SafeAreaView,
  Text,
  Button,
  // ActivityIndicator,
  View,
} from "react-native";
import { LogInProps } from "../screen.types";
import { useState } from "react";
import BaseInput from "../../feature-home/ui-components/Input/Input";

const LoginScreen = ({ onSubmit, navigation }: LogInProps): JSX.Element => {
  const [data, setData] = useState({ email: "", password: "" });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.viewContent}>
        <>
          <Text style={styles.title}>Connexion</Text>
          <View style={styles.container}>
            <BaseInput
              value={data.email}
              onChangeText={(v) => setData({ ...data, email: v })}
              placeholder="exemple@hotmail.com"
            />
            <BaseInput
              value={data.password}
              onChangeText={(v) => setData({ ...data, password: v })}
              placeholder="Password123!"
            />
          </View>
          <Button title="Confirm" onPress={() => onSubmit(data)} />
        </>
        <Button
          title="No account yet ? Sign in ->"
          onPress={() => navigation.navigate("SignIn")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  viewContent: {
    flexGrow: 1,
    backgroundColor: "#FFFF",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  container: {
    width: 350,
    justifyContent: "space-around",
    height: 350,
    borderRadius: 20,
    padding: 40,
    backgroundColor: "#ecf0f3",
    shadowColor: "#cbced1",
    shadowOffset: {
      width: 14,
      height: 14,
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
  },
  button: {
    fontSize: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 10,
  },
});

export default LoginScreen;
