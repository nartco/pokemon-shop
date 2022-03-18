import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const MoreModal = (modalVisible, setModalVisible) => (
  <Modal
    animationType='slide'
    // transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      setModalVisible(!modalVisible);
    }}
  >
    <View style={styles.centeredView}>
      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
        <View style={{ width: windowWidth / 2, marginBottom: 10 }}>
          <Text
            style={{ textAlign: "center", fontFamily: "gochi", fontSize: 20 }}
          >
            step back trainer ! a real trainer does not buy his pokemons !
          </Text>
        </View>
        <Image
          resizeMode='stretch'
          style={styles.laJoke}
          source={require("../assets/chen.png")}
        />
      </TouchableOpacity>
    </View>
  </Modal>
);

export { MoreModal as default };

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  laJoke: {
    width: windowWidth / 2,
    height: windowHeight / 3,
  },
});
