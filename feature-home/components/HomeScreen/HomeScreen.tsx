import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text, View, ScrollView } from "react-native";
import { useUser } from "../../../data-access/userContext";
import BaseButton from "../../ui-components/BaseButton/BaseButton";

const HomeScreen = (): JSX.Element => {
  const { getUserInfoFromToken, getUser } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUserInfoFromToken();
        await getUser();
      } catch (error) {
        console.error("Erreur de récupération des informations :", error);
      }
    };

    fetchData();
  }, [getUserInfoFromToken, getUser]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <Text style={styles.title}>Home</Text>
      </ScrollView>
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
    marginBottom: 20,
    width: "100%",
  },
});

export default HomeScreen;
