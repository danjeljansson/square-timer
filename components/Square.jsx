import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export default () => {
  const translation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translation, {
          toValue: 100,
          duration: 1000,
          delay: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(translation, {
          toValue: 0,
          duration: 1000,
          delay: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(translation, {
          toValue: -100,
          duration: 1000,
          delay: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(translation, {
          toValue: 0,
          duration: 1000,
          delay: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        width: 100,
        height: 100,
        backgroundColor: "orange",
        transform: [{ translateX: translation }],
      }}
    />
  );
};
