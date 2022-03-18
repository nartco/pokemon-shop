import { Animated, Easing } from "react-native";
const spinAnim = (spinValue) =>
  Animated.timing(spinValue, {
    toValue: 1,
    duration: 300,
    easing: Easing.linear, // Easing is an additional import from react-native
    useNativeDriver: true, // To make use of native driver for performance
  }).start();

export { spinAnim as default };
