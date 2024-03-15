import { StyleSheet, SafeAreaView, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../../data-access/userContext";
import { useEffect } from "react";

const ProfileScreen = (): JSX.Element => {
  const navigation = useNavigation();
  const { email, phone, getUser, getUserInfoFromToken } = useUser();

  const onNavBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    getUserInfoFromToken();
  }, []);

  useEffect(() => {
    // Au chargement du composant, fetch les données utilisateur
    getUser();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text>{email}</Text>
      <Text>{phone}</Text>
      <Button title="Refresh User Data" onPress={getUser} />
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
