import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  getItemById,
  markItemAsPurchased,
  updateItemById,
  deleteItemById,
} from "../../service/api";
import { Stack, useLocalSearchParams, router } from "expo-router";
import { format } from "date-fns";

function Edit() {
  const { id } = useLocalSearchParams();

  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isMarkingDone, setIsMarkingDone] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleOnUpdate = async () => {
    const body = {
      name,
      category,
    };
    setIsUpdating(true);
    try {
      await updateItemById(id, body);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleOnComplete = async () => {
    setIsMarkingDone(true);
    try {
      await markItemAsPurchased(id);
      router.back();
    } catch (error) {
      console.error(error);
    } finally {
      setIsMarkingDone(false);
    }
  };

  const handleOnDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteItemById(id);
      router.back();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    async function initialSetUp() {
      setIsLoading(true);
      try {
        const data = await getItemById(id);
        setName(data.name);
        setCategory(data.category);
        setCreatedAt(data.createdAt);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    initialSetUp();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await getItemById(id);
      setName(data.name);
      setCategory(data.category);
      setCreatedAt(data.createdAt);
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  };

  if (isLoading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Stack.Screen
          options={{
            title: "edit",
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

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Created At</Text>

              <TextInput
                value={format(new Date(createdAt), "yyyy-MM-dd")}
                style={styles.inputControl}
                autoCapitalize="none"
                editable={false}
              />
            </View>

            <View style={styles.btnGroup}>
              <TouchableOpacity
                onPress={handleOnComplete}
                style={{ flex: 1, paddingHorizontal: 6 }}
              >
                <View style={styles.btn}>
                  {isMarkingDone ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <>
                      <FontAwesome
                        color="white"
                        name="check-circle-o"
                        size={18}
                        style={{ marginRight: 5 }}
                      />
                      <Text style={styles.btnText}>Done</Text>
                    </>
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleOnUpdate}
                style={{ flex: 1, paddingHorizontal: 6 }}
              >
                <View style={styles.btn}>
                  {isUpdating ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <>
                      <FontAwesome
                        color="#fff"
                        name="pencil"
                        size={18}
                        style={{ marginRight: 5 }}
                      />

                      <Text style={styles.btnText}>Update</Text>
                    </>
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleOnDelete}
                style={{ flex: 1, paddingHorizontal: 6 }}
              >
                <View style={styles.btn}>
                  {isDeleting ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <>
                      <FontAwesome
                        color="#fff"
                        name="trash"
                        size={18}
                        style={{ marginRight: 5 }}
                      />
                      <Text style={styles.btnText}>Delete</Text>
                    </>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Edit;

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
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 50, // Adjust as needed
  },
  btnGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 100,
    marginHorizontal: -6,
  },
});
