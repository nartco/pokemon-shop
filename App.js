import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { useFonts, GochiHand_Regular } from "@expo-google-fonts/inter";
import HoennNavigation from "./navigation/HoennNavigation";
import { Provider } from "react-redux";
import store from "./redux/configureStore";

function App() {
  let [fontsLoaded] = useFonts({
    gochi: require("./assets/fonts/GochiHand-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <HoennNavigation />
      </View>
      <StatusBar style='dark' backgroundColor='black' />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
