import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { SvgUri } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { getPokemon, startLoading, clear } from "../redux/actions/details";
import getColorFromType from "../components/utils/getColorFromType";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Property = (pokemon, style, data, propertyName, badge, title) => {
  return (
    <View
      style={{
        ...styles.propertyContainer,
        ...{
          ...{
            shadowColor: pokemon.typeColor,
            borderColor: pokemon.typeColor,
          },
        },
      }}
    >
      <Text style={styles.propertyName}>{title}</Text>
      <View style={styles.typeContainer}>
        {Array.isArray(data) ? (
          data.map((value, i) => (
            <View
              key={i}
              style={{
                ...{
                  backgroundColor: badge
                    ? getColorFromType(value.type.name)
                    : "transparent",
                },
                ...(badge ? styles.badge : null),
              }}
            >
              <Text style={style}>{value[propertyName].name}</Text>
            </View>
          ))
        ) : (
          <Text style={style}>{data}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  typeContainer: { flexDirection: "row", justifyContent: "space-between" },
  badge: { marginHorizontal: 5, borderRadius: 30 },
  abilitiesName: { color: "black", paddingHorizontal: 10, paddingVertical: 3 },
  propertyName: {
    fontWeight: "600",
  },
  propertyContainer: {
    minWidth: windowWidth,
    alignItems: "center",
    borderBottomWidth: 1,
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
export { Property as default };
