import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  useColorScheme,
} from "react-native";

import Svg, { Path } from "react-native-svg";
import Colors from "../constants/Colors";
import UtilsStyles from "../constants/utlis";
import Status from "../components/StatusCard";

interface ButtonProps {
  onPress: () => void;
  roomName: string;
  roomPower: number;
  IconComponent: () => JSX.Element;
  status: number;
}

const RoomButton = (props: ButtonProps) => {
  const ColorSchema = useColorScheme();
  return (
    <TouchableOpacity
      style={[
        styles.button,
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
        },
      ]}
      onPress={props.onPress}
      activeOpacity={0.8}
    >
      <View
        style={[
          UtilsStyles.flex,
          UtilsStyles.alignItemsCenter,
          UtilsStyles.justifyContentSapceBetween,
        ]}
      >
        <View
          style={[UtilsStyles.flex, UtilsStyles.alignItemsCenter, { gap: 12 }]}
        >
          <View
            style={{
              backgroundColor:
                ColorSchema == "light"
                  ? Colors.light.background
                  : Colors.dark.background,
              padding: 10,
              borderRadius: 50,
            }}
          >
            {props.IconComponent()}
          </View>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                color:
                  ColorSchema == "light" ? Colors.light.text : Colors.dark.text,
              }}
            >
              {props.roomName}
            </Text>
            <View style={[UtilsStyles.flex, UtilsStyles.alignItemsCenter]}>
              <Svg
                height="14px"
                viewBox="0 -960 960 960"
                width="14px"
                fill={"orange"}
              >
                <Path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z" />
              </Svg>
              <Text
                style={{
                  fontSize: 11,
                  marginTop: 2,
                  color:
                    ColorSchema == "light"
                      ? Colors.light.text
                      : Colors.dark.text,
                }}
              >
                {props.status ? Math.round(props.roomPower) : 0} W
              </Text>
            </View>
          </View>
        </View>

        <Status status={props.status} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
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
    fontSize: 12,
  },
});

export default RoomButton;
