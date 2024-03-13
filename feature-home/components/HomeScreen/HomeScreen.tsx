import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  Button,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useApi } from "../../../useApi/useApi";

interface Product {
  product_name: string;
  categories: string;
}

const HomeScreen = (): JSX.Element => {
  const { searchProducts } = useApi();
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    setIsLoading(true); // Définir isLoading sur true pendant la recherche
    const results = await searchProducts(searchTerm);
    setSearchResults(results);
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <Text style={styles.title}>Home</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search products..."
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
          />
          <Button title="Search" onPress={handleSearch} />
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          searchResults.length > 0 && (
            <View>
              <Text style={styles.resultTitle}>Search Results:</Text>
              {searchResults.map((result, index) => (
                <>
                  <View>
                    <Text key={index}>{result.product_name}</Text>
                    <Text key={index}>{result.categories}</Text>
                  </View>
                </>
              ))}
            </View>
          )
        )}
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
    width: "100%",
    height: 30,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    width: "100%",
  },
});

export default HomeScreen;
