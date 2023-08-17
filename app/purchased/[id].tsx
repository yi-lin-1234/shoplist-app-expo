import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { getItemById } from "../../service/api";
import { Stack, useLocalSearchParams } from "expo-router";
import { format } from "date-fns";

function Purchased() {
  const { id } = useLocalSearchParams();

  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>("");
  const [updatedAt, setUpdatedAt] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function initialSetUp() {
      setIsLoading(true);
      try {
        const data = await getItemById(id);
        setName(data.name);
        setCategory(data.category);
        setCreatedAt(data.createdAt);
        setUpdatedAt(data.updatedAt);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    initialSetUp();
  }, []);

  if (isLoading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack.Screen
        options={{
          title: "Detail",
        }}
      />
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              onChangeText={(name) => setName(name)}
              value={name}
              style={styles.inputControl}
              autoCapitalize="none"
              editable={false}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Category</Text>
            <TextInput
              onChangeText={(category) => setCategory(category)}
              value={category}
              style={styles.inputControl}
              autoCapitalize="none"
              editable={false}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Created At</Text>
            <TextInput
              value={format(new Date(createdAt), "yyyy-MM-dd")}
              style={styles.inputControl}
              autoCapitalize="none"
              editable={false}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Purchased At</Text>
            <TextInput
              value={format(new Date(updatedAt), "yyyy-MM-dd")}
              style={styles.inputControl}
              autoCapitalize="none"
              editable={false}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Purchased;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  form: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 50, // Adjust as needed
  },
});
