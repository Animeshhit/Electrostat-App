import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { useEffect, useRef, useState } from "react";

import Colors from "../constants/Colors";
import UtilsStyles from "../constants/utlis";
import HeaderText from "../components/HeaderText";
import RoomCard from "../components/RoomCard";

import { ref, onValue, update } from "firebase/database";
import { database } from "../constants/firebase";

import { Status } from "../types/type";
import useStore from "../store/store";
import MainCardLoader from "@/components/loading/MainCardLoaindg";

export default function Kitchen() {
  const colorScheme = useColorScheme();
  const themeColor = Colors[colorScheme ?? "light"];

  const [roomSwitch, setRoomSwitch] = useState<Status>(0);
  const [current, setCurrent] = useState(0);
  const [power, setPower] = useState(0);
  const [loading, setLoading] = useState(true);

  const isFirstRun = useRef(true);
  const { status } = useStore(); // wifi/AP status

  // Fetch data on mount
  useEffect(() => {
    const roomsRef = ref(database, "rooms/kitchen");
    const unsubscribe = onValue(roomsRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setCurrent(data.kitchencurrent);
        setRoomSwitch(data.status);
        setPower(data.power);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Update room status when toggled
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    const roomsRef = ref(database, "rooms/kitchen");
    update(roomsRef, { status: roomSwitch, kitchencurrent: 0, power: 0 }).catch(
      (error) => {
        console.error("Failed to update status:", error);
      }
    );
  }, [roomSwitch]);

  return (
    <SafeAreaView
      style={[
        UtilsStyles.container,
        { backgroundColor: themeColor.background },
      ]}
    >
      <HeaderText text="Kitchen" />
      {loading ? (
        <MainCardLoader />
      ) : (
        <RoomCard
          roomSwitch={roomSwitch}
          setRoomSwtich={setRoomSwitch}
          current={current}
          powerConsumption={power}
          wifiMode={status}
          setLoading={setLoading}
        />
      )}
    </SafeAreaView>
  );
}
