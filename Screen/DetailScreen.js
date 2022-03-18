import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  Animated,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SvgUri } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { getPokemon, startLoading, clear } from "../redux/actions/details";
import { addToCart, removeToCart } from "../redux/actions/cart";
import Error from "../components/Error";
import Property from "../components/Property";
import spinAnim from "../components/animations/spin";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const DetailScreen = ({ route, navigation }) => {
  const { name, url, id, price } = route.params;
  const [inCart, setInCart] = useState(false);

  const pokemon = useSelector((state) => state.detailsReducer.pokemon);
  const isLoading = useSelector((state) => state.detailsReducer.isLoading);
  const error = useSelector((state) => state.detailsReducer.error);
  const cart = useSelector((state) => state.cartReducer.products);
  const spinValue = useRef(new Animated.Value(0)).current;

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoading());
    dispatch(getPokemon(url));
    cart.map((product, index) => {
      if (product.id === id) {
        setInCart(true);
      }
    });
    return () => {
      dispatch(clear());
    };
  }, []);

  useEffect(() => {
    navigation.setOptions(
      {
        title: `#${id} ${name}`,
        headerTitleStyle: {
          fontFamily: "gochi",
          fontSize: 25,
        },
      },
      [cart]
    );
  });

  if (isLoading && !pokemon)
    return (
      <View style={{ ...styles.container, ...{ justifyContent: "center" } }}>
        <ActivityIndicator size='large' />
      </View>
    );

  if (error) {
    return (
      <Error
        dispatch={dispatch}
        startLoading={startLoading}
        refreshFunction={getPokemon}
        url={url}
      />
    );
  }

  return (
    <View
      style={{
        ...styles.container,
        ...{ backgroundColor: pokemon.backgroundColor },
      }}
    >
      <LinearGradient
        colors={[pokemon.typeColor, pokemon.backgroundColor]}
        start={{ x: Platform.OS === "ios" ? 0.5 : 0, y: 0 }}
      >
        <View
          style={{
            ...styles.pokemonContainer,
            ...{
              shadowColor: pokemon.typeColor,
              borderColor: pokemon.typeColor,
            },
          }}
        >
          {pokemon.sprites.other.dream_world.front_default ? (
            <SvgUri
              width={windowWidth}
              height={windowWidth / 2}
              uri={pokemon.sprites.other.dream_world.front_default}
            />
          ) : (
            <Image
              style={styles.headerImage}
              source={{
                uri: pokemon.sprites.front_default,
              }}
            />
          )}
        </View>
      </LinearGradient>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          backgroundColor: pokemon.backgroundColor,
          height: Platform.OS === "ios" ? "100%" : null,
        }}
      >
        {Property(
          pokemon,
          styles.typeName,
          pokemon.types,
          "type",
          true,
          "Type"
        )}
        {Property(
          pokemon,
          styles.propertyValue,
          pokemon.abilities,
          "ability",
          false,
          "Abilities"
        )}
        {Property(
          pokemon,
          styles.propertyValue,
          pokemon.height,
          null,
          false,
          "Height"
        )}
        {Property(
          pokemon,
          styles.propertyValue,
          pokemon.weight,
          null,
          false,
          "Weight"
        )}
        {Property(
          pokemon,
          styles.propertyValue,
          pokemon.moves.slice(0, 3),
          "move",
          false,
          "Moves"
        )}
        {Property(pokemon, styles.propertyValue, price, null, false, "₽rice")}
        <View
          style={{
            ...styles.container,
            ...{
              marginVertical: 10,
            },
          }}
        >
          <Text style={styles.propertyName}>
            {inCart ? "Added to cart ✓" : "Add to cart:"}
          </Text>
          <Animated.View
            style={{
              ...{
                marginTop: 5,
                transform: [{ rotate: spin }],
              },
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (inCart) {
                  dispatch(removeToCart(id));
                  setInCart(false);
                } else {
                  dispatch(
                    addToCart({
                      name,
                      id,
                      url,
                      price,
                      backgroundColor: pokemon.backgroundColor,
                      typeColor: pokemon.typeColor
                    })
                  );
                  setInCart(true);
                }
                spinValue.setValue(0);
                spinAnim(spinValue);
              }}
            >
              {inCart ? (
                <Image
                  resizeMode='stretch'
                  style={styles.pokeButton}
                  source={require("../assets/pokeball.png")}
                />
              ) : (
                <Image
                  resizeMode='stretch'
                  style={styles.pokeButton}
                  source={require("../assets/pokeballOpen.png")}
                />
              )}
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  pokeButton: {
    width: windowWidth / 4,
    height: windowWidth / 4,
  },
  headerImage: {
    alignSelf: "center",
    width: windowWidth / 2,
    height: windowWidth / 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  pokemonContainer: {
    minWidth: windowWidth,
    minHeight: windowWidth / 1.7,
    justifyContent: "center",
    borderBottomWidth: 2,
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  propertyName: {
    fontWeight: "600",
    fontSize: 18,
  },
  typeName: { color: "white", paddingHorizontal: 10, paddingVertical: 3 },
  propertyValue: { color: "black", paddingHorizontal: 10, paddingVertical: 3 },
  movesValue: { color: "black", paddingHorizontal: 10, paddingVertical: 3 },
});

export default DetailScreen;
