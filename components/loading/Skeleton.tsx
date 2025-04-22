import React, { useEffect, useRef } from "react";
import {
  Animated,
  ViewStyle,
  StyleSheet,
  useColorScheme,
  View,
  DimensionValue,
} from "react-native";

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
}

const Skeleton: React.FC<SkeletonProps> = ({ width = "100%", height = 50 }) => {
  const colorScheme = useColorScheme();
  const opacity = useRef(new Animated.Value(0.5)).current;

  // Start the opacity animation when the component mounts
  useEffect(() => {
    const fadeAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true, // Use native driver for better performance
        }),
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    fadeAnimation.start(); // Start the animation

    // Cleanup the animation on unmount
    return () => fadeAnimation.stop();
  }, [opacity]);

  const skeletonStyle: ViewStyle = {
    width: width as DimensionValue,
    height: height as DimensionValue,
    opacity,
    backgroundColor: colorScheme === "dark" ? "#444" : "#ccc",
    borderRadius: 8,
  };

  return <Animated.View style={skeletonStyle} />;
};

export default Skeleton;
