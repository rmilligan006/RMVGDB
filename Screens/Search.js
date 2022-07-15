import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Image,
  makeRemoteRequest,
} from "react-native";
import { SearchBar } from "react-native-screens";

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      data: [],
      error: null,
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const url = `https://api.rawg.io/api/games?key=5879194321834ea8bdc805b90a28158d`;
    this.setState({ loading: true });

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          data: res.results,
          error: res.error || null,
          loading: false,
        });

        this.arrayholder = res.results;
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  };

  searchFilterFunction = (text) => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter((item) => {
      const itemData = `${item.name.title.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Find your next game!"
        lightTheme
        round
        onChangeText={(text) => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

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
          Search for your favourite Games:
        </Text>
        <FlatList data={this.state.data} />
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

export default Search;
