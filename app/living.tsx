import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { ref, onValue, update } from "firebase/database";

import UtilsStyles from "../constants/utlis";
import Colors from "../constants/Colors";
import HeaderText from "../components/HeaderText";
import RoomCard from "../components/RoomCard";
import { database } from "../constants/firebase";
import useStore from "../store/store";
import { Status } from "../types/type";
import MainCardLoader from "@/components/loading/MainCardLoaindg";

export default function Living() {
  const colorScheme = useColorScheme();
  const themeColor = Colors[colorScheme ?? "light"];

  const { status, powerStatus } = useStore();

  const [roomSwitch, setRoomSwitch] = useState<Status>(0);
  const [current, setCurrent] = useState(0);
  const [power, setPower] = useState(0);
  const [loading, setLoading] = useState(true);

  const isFirstRun = useRef(true);

  // Helper function to update room status
  const updateRoomStatus = async (status: Status) => {
    const roomRef = ref(database, "rooms/living");
    try {
      await update(roomRef, { status, livingcurrent: 0, power: 0 });
    } catch (error) {
      console.error("Failed to update room status:", error);
    }
  };

  useEffect(() => {
    const roomRef = ref(database, "rooms/living");
    const unsubscribe = onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCurrent(data.livingcurrent || 0);
        setRoomSwitch(data.status || 0);
        setPower(data.power || 0);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (powerStatus) {
      updateRoomStatus(roomSwitch);
    }
  }, [roomSwitch, powerStatus]);

  return (
    <SafeAreaView
      style={[
        UtilsStyles.container,
        { backgroundColor: themeColor.background },
      ]}
    >
      <HeaderText text="Living" />
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
