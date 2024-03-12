import { StyleSheet, SafeAreaView, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = (): JSX.Element => {
  const navigation = useNavigation();

  const onNavBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Profile</Text>
      <Button title="Go Back" onPress={onNavBack} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFF",
    width: "100%",
  },
  title: {
    fontSize: 30,
  },
});

export default ProfileScreen;
