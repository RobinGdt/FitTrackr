import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Text, View, ScrollView } from "react-native";

const HomeScreen = (): JSX.Element => {
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
