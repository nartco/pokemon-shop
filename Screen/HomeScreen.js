import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokemons, startLoading } from "../redux/actions/home";
import ListedItem from "../components/ListedItem";
import Error from "../components/Error";
import fadeIn from "../components/animations/fadeIn";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const pokemons = useSelector((state) => state.homeReducer.pokeList);
  const next = useSelector((state) => state.homeReducer.next);
  const isLoading = useSelector((state) => state.homeReducer.isLoading);
  const error = useSelector((state) => state.homeReducer.error);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    dispatch(startLoading());
    dispatch(getPokemons(0));
  }, []);

  useEffect(() => {
    if (pokemons && pokemons.length === 20 && isLoading === false) {
      fadeIn(fadeAnim);
    }
  }, [isLoading]);

  const loadMore = () => {
    if (next) {
      dispatch(startLoading());
      dispatch(getPokemons(pokemons.length));
    }
  };

  const renderItem = ({ item }) => {
    const getIdFromUrl = item.url.split("/");
    return (
      <ListedItem
        name={item.name}
        url={item.url}
        id={getIdFromUrl[6]}
        price={item.price}
        navigation={navigation}
      />
    );
  };

  if (isLoading && !pokemons)
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
        refreshFunction={getPokemons}
      />
    );
  }

  return (
    <Animated.View style={{ ...styles.container, ...{ opacity: fadeAnim } }}>
      <FlatList
        ListHeaderComponent={
          <View
            style={{
              ...styles.container,
              ...styles.headerContainer,
            }}
          >
            <Text style={styles.headerTitle}>Hoenn</Text>
            <Image
              resizeMode='stretch'
              style={styles.headerImage}
              source={require("../assets/mountain.png")}
            />
          </View>
        }
        onEndReached={() => loadMore()}
        onEndReachedThreshold={0.5}
        initialNumToRender={20}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={styles.header}
        ListFooterComponent={
          isLoading && pokemons ? (
            <View style={styles.container}>
              <ActivityIndicator size='large' />
            </View>
          ) : null
        }
        columnWrapperStyle={styles.row}
        numColumns={2}
        data={pokemons}
        renderItem={renderItem}
        keyExtractor={(item, i) => i}
      />
    </Animated.View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6e6e6",
  },

  header: {
    flex: 1,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: windowHeight / 4,

    marginBottom: 10,
  },
  headerTitle: {
    fontFamily: "gochi",
    fontSize: 30,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 2,
  },
  headerImage: {
    width: windowWidth,
    height: windowWidth / 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // borderWidth: 4,
    // borderRadius: 90,
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
});
