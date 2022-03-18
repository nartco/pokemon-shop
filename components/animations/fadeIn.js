import { Animated } from "react-native";
const fadeIn = (fadeVar, time = 3000) => {
  // Will change fadeAnim value to 1 in 5 seconds
  return Animated.timing(fadeVar, {
    toValue: 1,
    duration: time,
    useNativeDriver: true,
  }).start();
};

export { fadeIn as default };
