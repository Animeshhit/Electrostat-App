import { View, Text, StyleSheet, useColorScheme } from "react-native";
import React from "react";
import Colors from "../constants/Colors";

export default function Status({ status }: { status: number }) {
  const colorSchema = useColorScheme();
  return (
    <View
      style={[
        styles.status,
        {
          backgroundColor:
            colorSchema == "light"
              ? status
                ? Colors.light.lightGreen
                : Colors.light.lightRed
              : status
              ? Colors.light.green
              : "red",
        },
      ]}
    >
      <Text
        style={[
          styles.statusText,
          {
            color:
              colorSchema == "light"
                ? status
                  ? Colors.light.green
                  : "red"
                : "white",
          },
        ]}
      >
        {status ? "Active" : " Inactive"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  status: {
    paddingVertical: 5,
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  statusText: {
    fontWeight: "500",
    fontSize: 12,
  },
});
