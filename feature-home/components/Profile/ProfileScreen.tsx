import {
  StyleSheet,
  SafeAreaView,
  Text,
  Button,
  View,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../../data-access/userContext";
import * as ImagePicker from "expo-image-picker";
import BaseButton from "../../ui-components/BaseButton/BaseButton";

const ProfileScreen = (): JSX.Element => {
  const navigation = useNavigation();
  const { email, imageUrl, weigth, firstname, logOut, setImageUrl } = useUser();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("img", result);

    if (!result.canceled && result.assets.length > 0) {
      setImageUrl(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.userInfosContainer}>
        <View
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            backgroundColor: imageUrl ? "" : "grey",
            justifyContent: "flex-end",
            marginBottom: 20,
          }}
        >
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={{ width: 200, height: 200, borderRadius: 100 }}
            />
          ) : (
            <BaseButton title="Add profile picture" onPress={pickImage} />
          )}
        </View>

        <Text style={styles.title}>{firstname}</Text>
        <Text style={styles.subtitle}>{email}</Text>
      </View>
      <View style={styles.circleWrapper}>
        <View style={styles.circleContainer}>
          <View style={styles.circle}>
            <Text style={styles.icon}>🐋</Text>
          </View>
          <Text style={{ fontWeight: "700" }}>{weigth} kg</Text>
        </View>
        <View style={styles.circle}>
          <Text style={styles.icon}>🔥</Text>
        </View>
        <View style={styles.circle}>
          <Text style={styles.icon}>💪🏻</Text>
        </View>
      </View>
      <Button
        title="Log Out"
        onPress={() => {
          logOut();
          navigation.navigate("LogIn" as never);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFF",
    width: "100%",
    gap: 60,
  },
  userInfosContainer: {
    paddingTop: 40,
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "600",
  },
  circleWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  circleContainer: {
    gap: 12,
  },
  icon: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 25,
    fontWeight: "200",
    letterSpacing: 1,
  },
  circle: {
    width: 40,
    height: 40,
    backgroundColor: "lightblue",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileScreen;
