import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TouchableOpacity, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

// Screens
import HomeScreen from "../Screen/HomeScreen";
import DetailScreen from "../Screen/DetailScreen";
import SearchScreen from "../Screen/SearchScreen";
import CartScreen from "../Screen/CartScreen";

// Navigator
const Stack = createNativeStackNavigator();

const headerOptions = {
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: "black",
  },
  headerTintColor: "white",
};

const headerRight = ({ navigation }, products) => ({
  headerRight: () => (
    <TouchableOpacity
      style={{ marginRight: 10 }}
      onPress={() => navigation.navigate("Cart")}
    >
      <View
        style={{
          position: "absolute",
          zIndex: 2,
          top: -5,
          left: 20,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            color: "rgb(238,21,21)",
            fontWeight: "bold",
            fontSize: 10,
          }}
        >
          {products.length > 0 ? products.length : ""}
        </Text>
      </View>
      <MaterialCommunityIcons name='pokeball' size={24} color='white' />
    </TouchableOpacity>
  ),
});

const HoennNavigation = () => {
  const products = useSelector((state) => state.cartReducer.products);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={({ navigation }) => ({
            ...headerOptions,
            ...headerRight({ navigation }, products),
          })}
        />
        <Stack.Screen
          name='Detail'
          component={DetailScreen}
          options={({ navigation }) => ({
            ...headerOptions,
            ...{ headerBackTitle: "" },
          })}
        />
        <Stack.Screen
          name='Search'
          component={SearchScreen}
          options={headerOptions}
        />
        <Stack.Screen
          name='Cart'
          component={CartScreen}
          options={headerOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { HoennNavigation as default };
