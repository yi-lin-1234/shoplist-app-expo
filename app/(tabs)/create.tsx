import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { createItem } from "../../service/api";

function Create() {
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleCreatePress = async () => {
    const body = {
      name,
      category,
    };
    setIsSubmitting(true);
    try {
      await createItem(body);
      setName("");
      setCategory("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              onChangeText={(name) => setName(name)}
              value={name}
              style={styles.inputControl}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Category</Text>

            <TextInput
              onChangeText={(category) => setCategory(category)}
              value={category}
              style={styles.inputControl}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={handleCreatePress}
              disabled={isSubmitting}
            >
              <View style={styles.btn}>
                {isSubmitting ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.btnText}>Create</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Create;

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
  formAction: {
    marginVertical: 24,
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
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: "#007aff",
    borderColor: "#007aff",
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    color: "#fff",
  },
  successMessage: {
    marginTop: 20,
    color: "green",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
