import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";

const Error = ({ dispatch, startLoading, refreshFunction, url } = {}) => (
  <View
    style={{
      ...styles.container,
      ...{ justifyContent: "center", alignItems: "center" },
    }}
  >
    <Text
      style={{
        ...styles.headerTitle,
        ...{ textAlign: "center", marginBottom: 10 },
      }}
    >
      Unable to connect to the network, please check your network connection and
      try again.
    </Text>
    <TouchableOpacity
      onPress={() => {
        dispatch(startLoading());
        url ? dispatch(refreshFunction(url)) : dispatch(refreshFunction());
      }}
    >
      <View
        style={{
          borderWidth: 2,
          borderRadius: 100,
          padding: 20,
          backgroundColor: "white",
        }}
      >
        <Text style={{ fontWeight: "800" }}>Try Again</Text>
      </View>
    </TouchableOpacity>
  </View>
);

export { Error as default };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6e6e6",
  },

  headerTitle: {
    fontFamily: "gochi",
    fontSize: 30,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 2,
  },
});
