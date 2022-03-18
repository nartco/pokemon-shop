import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  Modal,
  TouchableOpacity
} from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeToCart } from "../redux/actions/cart";
import MoreModal from "../components/Modal";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { FontAwesome } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cartReducer.products);
  const [modalVisible, setModalVisible] = useState(false);

  const total = () => {
    return products.length === 1
      ? products[0].price
      : products.map((product) => product.price).reduce((a, b) => a + b);
  };

  const rightSide = (progress, dragX, product) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity onPress={() => dispatch(removeToCart(product.id))}>
        <View
          style={{
            ...styles.swipe,
            ...{
              backgroundColor: product.backgroundColor,
              borderBottomColor: product.typeColor,
              borderTopColor: product.typeColor,
            },
          }}
        >
          <FontAwesome name='remove' size={20} color={"red"} />
        </View>
      </TouchableOpacity>
    );
  };

  if (products.length === 0)
    return (
      <View style={{ ...styles.container, ...styles.empty }}>
        <Text style={styles.title}>your cart is currently empty</Text>
      </View>
    );

  return (
    <View style={{ ...styles.container, ...{ backgroundColor: "black" } }}>
      {MoreModal(modalVisible, setModalVisible)}
      <View style={{ height: windowHeight / 1.31, backgroundColor: "#E6E6E6" }}>
        <ScrollView>
          {products.map((product, index) => (
            <GestureHandlerRootView key={product.id}>
              <Swipeable
                renderRightActions={(progress, dragX) =>
                  rightSide(progress, dragX, product)
                }
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Detail", {
                      name: product.name,
                      url: product.url,
                      id: product.id,
                      price: product.price,
                    })
                  }
                >
                  <View
                    style={{
                      ...styles.card,
                      ...{ backgroundColor: product.backgroundColor },
                    }}
                  >
                    <Image
                      style={styles.itemImage}
                      source={{
                        uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${product.id}.png`,
                      }}
                    />

                    <View style={styles.propertyCard}>
                      <Text style={styles.propertyText}>Number:</Text>
                      <Text>{`#${product.id}`}</Text>
                    </View>
                    <View style={styles.propertyCard}>
                      <Text style={styles.propertyText}>Name:</Text>
                      <Text>{product.name}</Text>
                    </View>
                    <View style={styles.propertyCard}>
                      <Text style={styles.propertyText}>Price:</Text>
                      <Text>{product.price}₽</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Swipeable>
            </GestureHandlerRootView>
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          position: "absolute",
          top: windowHeight / 1.3,
          left: 0,
          right: 0,
          zIndex: 1,
        }}
      >
        <TouchableOpacity
          style={{ alignSelf: "center", zIndex: 3 }}
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.buyBtn}>
            <Text style={styles.txtBtn}>{`${products.length}P | Buy | total: ${total()}₽`}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: "space-around",
  },
  propertyCard: {
    maxWidth: windowWidth / 5,
    justifyContent: "center",
    alignItems: "center",
  },
  propertyText: {
    fontWeight: "bold",
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "gochi",
    fontSize: 20,
  },
  itemImage: {
    width: windowWidth / 4,
    height: windowWidth / 4,
  },
  swipe: {
    flex: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    justifyContent: "center",
    alignItems: "center",

    // marginVertical: 5,
    padding: 20,
  },
  buyBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth / 1.6,
    height: 40,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: "white",
  },
  txtBtn: { fontWeight: "bold", color: "white", fontSize: 22 },
  laJoke: {
    width: windowWidth / 2,
    height: windowHeight / 3,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});
