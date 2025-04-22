import { View, Text, StyleSheet, useColorScheme } from "react-native";
import React from "react";
import UtilsStyles from "../constants/utlis";
import Colors from "../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";

interface FaultCardProps {
  fault: number;
  faultName: string;
}

const FaultCard = ({ fault, faultName }: FaultCardProps) => {
  const ColorSchema = useColorScheme();
  const themeColor = Colors[ColorSchema ?? "light"];
  return (
    <View
      style={[
        styles.faultCardContainer,
        {
          backgroundColor:
            ColorSchema == "light" ? Colors.light.background : "black",
          shadowColor: ColorSchema == "light" ? "rgba(0,0,0,0.3)" : "",
          borderWidth: 0.5,
          borderStyle: "solid",
          borderColor:
            ColorSchema == "light"
              ? "rgba(0,0,0,0.2)"
              : "rgba(255,255,255,0.2)",
          marginTop: 23,
        },
      ]}
    >
      <View
        style={[
          UtilsStyles.flex,
          UtilsStyles.alignItemsCenter,
          UtilsStyles.justifyContentSapceBetween,
        ]}
      >
        <Text
          style={{ fontSize: 23, fontWeight: "bold", color: themeColor.text }}
        >
          {faultName}
        </Text>
        {!fault ? (
          <Ionicons
            name="checkmark-done-circle"
            size={24}
            color={Colors.light.green}
          />
        ) : (
          <Entypo name="warning" size={24} color="red" />
        )}
      </View>
      <View
        style={[
          { marginTop: 12 },
          UtilsStyles.flex,
          UtilsStyles.alignItemsCenter,
          UtilsStyles.justifyContentSapceBetween,
        ]}
      >
        <View
          style={[
            styles.status,
            {
              backgroundColor:
                ColorSchema == "light"
                  ? !fault
                    ? Colors.light.lightGreen
                    : Colors.light.lightRed
                  : !fault
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
                  ColorSchema == "light"
                    ? !fault
                      ? Colors.light.green
                      : "red"
                    : "white",
              },
            ]}
          >
            {!fault ? "NORMAL" : "FAULT DETECTED"}
          </Text>
        </View>

        <Text style={{ color: themeColor.text }}>
          {!fault ? "System Ok" : "Action Required"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  faultCardContainer: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 7,
    width: "100%",

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android shadow
    elevation: 4,
  },
  status: {
    paddingVertical: 5,
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  statusText: {
    fontWeight: "500",
    fontSize: 16,
  },
});

export default FaultCard;
