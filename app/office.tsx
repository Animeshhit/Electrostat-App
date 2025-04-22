import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { useEffect, useRef, useState } from "react";

import UtilsStyles from "../constants/utlis";
import Colors from "../constants/Colors";
import HeaderText from "../components/HeaderText";
import RoomCard from "../components/RoomCard";

import { ref, onValue, update } from "firebase/database";
import { database } from "../constants/firebase";

import { Status } from "../types/type";
import useStore from "../store/store";
import MainCardLoader from "@/components/loading/MainCardLoaindg";

export default function Office() {
  const colorScheme = useColorScheme();
  const themeColor = Colors[colorScheme ?? "light"];

  const [roomSwitch, setRoomSwitch] = useState<Status>(0);
  const [current, setCurrent] = useState(0);
  const [power, setPower] = useState(0);
  const [loading, setLoading] = useState(true);

  const isFirstRun = useRef(true);
  const { status } = useStore(); // wifi/AP mode

  // Fetch initial office data
  useEffect(() => {
    const roomsRef = ref(database, "rooms/office");
    const unsubscribe = onValue(roomsRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        console.log(data);
        setCurrent(data.officecurrent || 0);
        setRoomSwitch(data.status || 0);
        setPower(data.power || 0);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Update room status on toggle
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    const roomsRef = ref(database, "rooms/office");
    update(roomsRef, { status: roomSwitch, officecurrent: 0, power: 0 }).catch(
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
      <HeaderText text="Office" />
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
