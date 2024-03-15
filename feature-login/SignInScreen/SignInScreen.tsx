import {
  StyleSheet,
  SafeAreaView,
  Text,
  Button,
  ActivityIndicator,
  View,
  Pressable,
} from "react-native";
import { SignInProps } from "../screen.types";
import { useState } from "react";
import BaseInput from "../../feature-home/ui-components/Input/Input";

const SignInScreen = ({
  onSubmit,
  isCreated,
  loading,
  navigation,
}: SignInProps): JSX.Element => {
  const [data, setData] = useState({
    email: "",
    password: "",
    phone: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
    weight: 0,
    size: 0,
  });
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.scrollViewContent}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <>
            {isCreated ? (
              navigation.navigate("App")
            ) : (
              <>
                <Text style={styles.title}>Registration</Text>
                {/* Afficher les champs en fonction de l'étape */}
                {step === 1 && (
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
                    <BaseInput
                      value={data.confirmPassword}
                      onChangeText={(v) =>
                        setData({ ...data, confirmPassword: v })
                      }
                      placeholder="Confirm password"
                    />
                  </View>
                )}
                {step === 2 && (
                  <View style={styles.container}>
                    <BaseInput
                      value={data.firstname}
                      onChangeText={(v) => setData({ ...data, firstname: v })}
                      placeholder="First name"
                    />
                    <BaseInput
                      value={data.lastname}
                      onChangeText={(v) => setData({ ...data, lastname: v })}
                      placeholder="Last name"
                    />
                    <BaseInput
                      value={data.phone}
                      onChangeText={(v) => setData({ ...data, phone: v })}
                      placeholder="Phone"
                    />
                  </View>
                )}
                {step === 3 && (
                  <View style={styles.container}>
                    <BaseInput
                      keyboardType="numeric"
                      value={data.weight.toString()}
                      onChangeText={(v) =>
                        setData({ ...data, weight: parseInt(v) })
                      }
                      placeholder="Weight"
                    />
                    <BaseInput
                      keyboardType="numeric"
                      value={data.size.toString()}
                      onChangeText={(v) =>
                        setData({ ...data, size: parseInt(v) })
                      }
                      placeholder="Size"
                    />
                  </View>
                )}
                <View style={styles.stepWrapper}>
                  {step > 1 && (
                    <Pressable onPress={handlePrevStep}>
                      <Text style={styles.button}>⬅️</Text>
                    </Pressable>
                  )}
                  {step < 3 && (
                    <Pressable onPress={handleNextStep}>
                      <Text style={styles.button}>➡️</Text>
                    </Pressable>
                  )}
                </View>
                {step === 3 && (
                  <Button
                    title="Confirm"
                    onPress={() => {
                      if (data.password !== data.confirmPassword) {
                        console.log("Passwords do not match");
                        return;
                      }
                      onSubmit(data);
                    }}
                  />
                )}
              </>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: "#FFFF",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  container: {
    width: 350,
    justifyContent: "space-evenly",
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
  stepWrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    fontSize: 40,
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

export default SignInScreen;
