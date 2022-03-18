import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ListedItem = ({ name, url, id, price, navigation }) => (
  <View style={styles.itemContainer}>
    <TouchableOpacity
      onPress={() => navigation.navigate("Detail", { name, url, id, price })}
    >
      <View style={styles.item}>
        <Image
          style={styles.itemImage}
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          }}
        />
        <Text numberOfLines={1} style={styles.name}>{`#${id} ${name}`}</Text>
        <Text style={styles.price}>{`${price}₽`}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

export { ListedItem as default };

const styles = StyleSheet.create({
  itemContainer: {
    width: windowWidth / 2.5,
    borderWidth: 3,
    borderRadius: 30,
    marginBottom: 30,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 0,
  },
  item: {
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 0,
    borderWidth: 2,
    borderRadius: 23,
  },
  itemImage: {
    padding: 2,
    width: windowWidth / 3,
    height: windowHeight / 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  name: {
    fontFamily: "gochi",
    fontSize: 15,
  },
  price: {
    fontWeight: "500",
  },
});
