import { StyleSheet, SafeAreaView, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = (): JSX.Element => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Home</Text>
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

export default HomeScreen;
