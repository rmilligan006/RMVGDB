import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      data: [],
    };
  }

  async apiCall() {
    let resp = await fetch(
      `https://api.rawg.io/api/games?key=5879194321834ea8bdc805b90a28158d&dates=2019-10-10,2022-07-07&ordering=-added`
    );
    let respJson = await resp.json();
    this.setState({ loading: true });
    //console.warn(respJson);
    this.setState({ data: respJson.results, loading: false });
  }

  componentDidMount() {
    this.apiCall();
  }

  render() {
    if (this.state.loading) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#3EC70B" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 35, fontWeight: "700", color: "#3EC70B" }}>
          RMVGDB
        </Text>
        <Text style={{ color: "#fff", fontSize: 25, paddingBottom: 10 }}>
          Hottest Games:
        </Text>
        <SafeAreaView style={styles.results}>
          <FlatList
            data={this.state.data}
            contentContainerStyle={{ paddingBottom: 70 }}
            renderItem={({ item }) => (
              <View>
                <Image
                  source={{ uri: item.background_image }}
                  style={{
                    width: "100%",
                    height: 300,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                  resizeMode="stretch"
                />
                <Text style={styles.heading}>{item.slug}</Text>
              </View>
            )}
          />
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#51557E",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 70,
    paddingHorizontal: 10,
  },
  results: {
    width: "100%",
    marginBottom: 10,
  },
  heading: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    padding: 10,
    paddingBottom: 10,
    backgroundColor: "#2C3639",
  },
});

export default Home;
