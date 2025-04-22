import React, { useRef, useEffect } from "react";
import { TouchableOpacity, Animated, StyleSheet } from "react-native";
import { Status } from "../types/type";

interface ToggleSwitchProps {
  isOn: Status;
  setIsOn?: (value: Status) => void;
}

const ToggleSwitch = ({ isOn, setIsOn }: ToggleSwitchProps) => {
  const animValue = useRef(new Animated.Value(isOn ? 1 : 0)).current;

  // Sync animation with external isOn value
  useEffect(() => {
    Animated.timing(animValue, {
      toValue: isOn ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isOn]);

  const toggleSwitch = () => {
    if (setIsOn) {
      setIsOn(isOn == 0 ? 1 : 0);
    }
  };

  const circleTranslate = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  const backgroundColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ccc", "#00C28A"],
  });

  return (
    <TouchableOpacity onPress={toggleSwitch} activeOpacity={0.8}>
      <Animated.View style={[styles.switch, { backgroundColor }]}>
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [{ translateX: circleTranslate }],
            },
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switch: {
    width: 50,
    height: 30,
    borderRadius: 30,
    padding: 2,
    justifyContent: "center",
  },
  circle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
});

export default ToggleSwitch;
