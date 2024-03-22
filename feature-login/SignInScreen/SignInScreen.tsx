import {
  StyleSheet,
  SafeAreaView,
  Text,
  Button,
  ActivityIndicator,
  View,
  Image,
  Pressable,
} from "react-native";
import { SignInProps } from "../screen.types";
import { useState } from "react";
import BaseInput from "../../feature-home/ui-components/Input/Input";
import * as ImagePicker from "expo-image-picker";
import BaseButton from "../../feature-home/ui-components/BaseButton/BaseButton";

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
    imgUrl: "",
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("img", result);

    if (!result.canceled && result.assets.length > 0) {
      setData({ ...data, imgUrl: result.assets[0].uri });
    }
  };

  const deleteImage = () => {
    setData({ ...data, imgUrl: "" });
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
                    <View
                      style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <BaseButton
                        title="Pick an image from camera roll"
                        onPress={pickImage}
                      />
                      {data.imgUrl && (
                        <Image
                          source={{ uri: data.imgUrl }}
                          style={{ width: 200, height: 200 }}
                        />
                      )}
                    </View>
                    <View style={styles.imagesButtonWrapper}>
                      <BaseButton title="Delete" onPress={deleteImage} />
                      <BaseButton title="Edit" onPress={pickImage} />
                    </View>
                    <BaseButton
                      title="Confirm"
                      onPress={() => {
                        if (data.password !== data.confirmPassword) {
                          console.log("Passwords do not match");
                          return;
                        }
                        onSubmit(data);
                      }}
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
  imagesButtonWrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  container: {
    width: 350,
    justifyContent: "space-evenly",
    height: 600,
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
    gap: 20,
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
