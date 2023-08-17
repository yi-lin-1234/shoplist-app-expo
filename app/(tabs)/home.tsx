import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";

import { getUnpurchasedItems } from "../../service/api";
import { Item } from "../../type";
import { Link } from "expo-router";

function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    async function initialSetUp() {
      setIsLoading(true);
      try {
        const data = await getUnpurchasedItems();
        setItems(data);
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
      const data = await getUnpurchasedItems();
      setItems(data);
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F2F2F2" }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <View style={styles.stats}>
            {items.map((item) => (
              <Link key={item.id} href={`/edit/${item.id}`} asChild>
                <TouchableOpacity>
                  <View style={styles.statsItem}>
                    <Text style={styles.statsItemLabel}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  stats: {
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
  },
  statsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 12,
  },
  statsItemLabel: {
    marginLeft: 8,
    marginRight: "auto",
    fontSize: 15,
    fontWeight: "600",
    color: "#4e4a6d",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 50, // Adjust as needed
  },
});
