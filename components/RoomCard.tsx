import { StyleSheet, View, Text, Pressable } from "react-native";
import { useColorScheme } from "react-native";
import ToggleSwitchForRoom from "./ToggleSwtichForRoom";
import AntDesign from "@expo/vector-icons/AntDesign";
import Colors from "../constants/Colors";
import Svg, { Path } from "react-native-svg";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import UtilsStyles from "../constants/utlis";
import StatusCard from "./StatusCard";
import { Status } from "../types/type";
import handlePress from "@/constants/updateData";
import { database } from "@/constants/firebase";
import useStore from "@/store/store";

interface RoomCardProps {
  roomSwitch: Status;
  setRoomSwtich: React.Dispatch<React.SetStateAction<Status>>;
  current: number;
  powerConsumption: number;
  wifiMode: Status;
  setLoading: (value: boolean) => void;
}

const RoomCard = ({
  roomSwitch,
  setRoomSwtich,
  current,
  powerConsumption,
  wifiMode,
  setLoading,
}: RoomCardProps) => {
  const colorScheme = useColorScheme();

  const { setStatus } = useStore();

  const handlePressclick = () => {
    handlePress(setLoading, database, setStatus);
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
          borderColor:
            colorScheme == "dark" ? "rgba(255,255,255,0.6)" : "transparent",
          borderWidth: colorScheme == "dark" ? 0.2 : 0,
        },
      ]}
    >
      {/* Card Header */}
      <View
        style={[
          UtilsStyles.flex,
          UtilsStyles.alignItemsCenter,
          UtilsStyles.justifyContentSapceBetween,
        ]}
      >
        <View
          style={[UtilsStyles.flex, UtilsStyles.alignItemsCenter, { gap: 9 }]}
        >
          <AntDesign
            name="poweroff"
            size={18}
            color={roomSwitch ? Colors.light.green : "red"}
          />
          <Text
            style={[
              styles.cardHeaderTitle,
              {
                color:
                  colorScheme == "light" ? Colors.light.text : Colors.dark.text,
              },
            ]}
          >
            Power Status
          </Text>
        </View>
        <ToggleSwitchForRoom isOn={roomSwitch} setIsOn={setRoomSwtich} />
      </View>

      {/* Current Display */}
      <View
        style={[
          styles.voltageCard,
          {
            borderColor:
              colorScheme === "dark"
                ? "rgba(255,255,255,0.6)"
                : "rgba(0,0,0,0.2)",
          },
        ]}
      >
        <View
          style={[UtilsStyles.flex, UtilsStyles.alignItemsCenter, { gap: 4 }]}
        >
          <Svg
            height="18px"
            viewBox="0 -960 960 960"
            width="18px"
            fill={roomSwitch ? "orange" : "gray"}
          >
            <Path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z" />
          </Svg>
          <Text
            style={[
              styles.voltageCardHeaderTitle,
              {
                color:
                  colorScheme == "light" ? Colors.light.text : Colors.dark.text,
              },
            ]}
          >
            Present Current
          </Text>
        </View>
        <View
          style={[
            UtilsStyles.flex,
            UtilsStyles.alignItemsCenter,
            { gap: 2, marginTop: 8, paddingLeft: 8 },
          ]}
        >
          <Text
            style={[
              styles.value,
              {
                color: roomSwitch
                  ? colorScheme == "light"
                    ? Colors.light.text
                    : Colors.dark.text
                  : "gray",
              },
            ]}
          >
            {roomSwitch ? current : 0}
          </Text>
          <Text style={[styles.smallValue]}>A</Text>
        </View>
      </View>

      {/* Power Consumption */}
      <View
        style={[
          styles.voltageCard,
          {
            marginTop: 16,
            borderColor:
              colorScheme === "dark"
                ? "rgba(255,255,255,0.6)"
                : "rgba(0,0,0,0.2)",
          },
        ]}
      >
        <View
          style={[UtilsStyles.flex, UtilsStyles.alignItemsCenter, { gap: 4 }]}
        >
          <Svg
            height="18px"
            viewBox="0 -960 960 960"
            width="18px"
            fill={roomSwitch ? "#068FFF" : "gray"}
          >
            <Path d="m140-220-60-60 300-300 160 160 284-320 56 56-340 384-160-160-240 240Z" />
          </Svg>
          <Text
            style={[
              styles.voltageCardHeaderTitle,
              {
                color:
                  colorScheme == "light" ? Colors.light.text : Colors.dark.text,
              },
            ]}
          >
            Power Consumption
          </Text>
        </View>
        <View
          style={[
            UtilsStyles.flex,
            UtilsStyles.alignItemsCenter,
            { gap: 2, marginTop: 8, paddingLeft: 8 },
          ]}
        >
          <Text
            style={[
              styles.value,
              {
                color: roomSwitch
                  ? colorScheme == "light"
                    ? Colors.light.text
                    : Colors.dark.text
                  : "gray",
              },
            ]}
          >
            {roomSwitch ? powerConsumption : 0}
          </Text>
          <Text style={styles.smallValue}>W</Text>
        </View>
      </View>

      {/* WiFi Status */}
      <View
        style={[
          UtilsStyles.flex,
          UtilsStyles.justifyContentSapceBetween,
          UtilsStyles.alignItemsCenter,
          styles.voltageCard,
          {
            marginTop: 16,
            borderColor:
              colorScheme === "dark"
                ? "rgba(255,255,255,0.6)"
                : "rgba(0,0,0,0.2)",
          },
        ]}
      >
        <View
          style={[UtilsStyles.flex, UtilsStyles.alignItemsCenter, { gap: 5 }]}
        >
          <Ionicons
            name="settings"
            size={18}
            color={wifiMode ? Colors.light.green : "gray"}
          />
          <Text
            style={{
              fontWeight: "500",
              color:
                colorScheme == "light" ? Colors.light.text : Colors.dark.text,
            }}
          >
            Status
          </Text>
        </View>
        <StatusCard status={wifiMode} />
      </View>

      {/* Refresh */}
      <View
        style={[
          UtilsStyles.flex,
          UtilsStyles.justifyContentSapceBetween,
          UtilsStyles.alignItemsCenter,
          { marginTop: 28 },
        ]}
      >
        <View
          style={[
            UtilsStyles.flex,
            UtilsStyles.alignItemsCenter,
            { gap: 5, paddingHorizontal: 8 },
          ]}
        >
          {wifiMode ? (
            <FontAwesome5
              name="wifi"
              size={15}
              color={
                colorScheme === "light" ? Colors.light.text : Colors.dark.text
              }
            />
          ) : (
            <Ionicons
              name="cellular"
              size={15}
              color={
                colorScheme === "light" ? Colors.light.text : Colors.dark.text
              }
            />
          )}

          <Text
            style={{
              fontSize: 12,
              color:
                colorScheme == "light" ? Colors.light.text : Colors.dark.text,
            }}
          >
            {wifiMode ? "WIFI Mode" : "AP Mode"}
          </Text>
        </View>
        <Pressable onPress={handlePressclick}>
          <EvilIcons
            name="refresh"
            size={24}
            color={
              colorScheme === "light" ? Colors.light.text : Colors.dark.text
            }
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardHeaderTitle: {
    fontWeight: "900",
    fontSize: 18,
  },
  voltageCard: {
    marginTop: 25,
    borderWidth: 0.2,
    borderColor: "rgba(0,0,0,0.2)",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 7,
  },
  voltageCardHeaderTitle: {
    fontWeight: "500",
    fontSize: 15,
  },
  value: {
    fontWeight: "900",
    fontSize: 28,
  },
  smallValue: {
    fontSize: 16,
    color: "rgba(0,0,0,0.6)",
  },
});

export default RoomCard;
