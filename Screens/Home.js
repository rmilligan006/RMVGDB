import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Keyboard,
  FlatList,
  Image,
} from "react-native";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState();

  const apiKey = "5879194321834ea8bdc805b90a28158d";
  const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}&dates=2019-10-10,2022-07-07&ordering=-added`;

  async function apiCall() {
    setLoading(true);
    let resp = await fetch(apiUrl);
    let respJson = await resp.json();
    setDetails(respJson);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    apiCall();
  }, []);

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 55,
          fontWeight: "800",
          width: "90%",
          color: "#3EC70B",
        }}
      >
        RMVGDB
      </Text>
      <Text style={{ flex: 1, color: "#fff", fontSize: 25 }}>
        {" "}
        Hottest Games:
      </Text>
      <SafeAreaView style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#3EC70B" />
        ) : (
          <FlatList
            style={styles.games}
            data={details}
            keyExtractor={id}
            renderItem={({ item }) => (
              <View style={styles.game}>
                <Image
                  style={styles.image}
                  source={{ uri: `${item.details.image_background}` }}
                />
              </View>
            )}
          ></FlatList>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#51557E",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
  },
  label: {
    fontSize: 15,
    width: "60%",
    color: "#008080",
    fontWeight: "700",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 20,
  },
});
