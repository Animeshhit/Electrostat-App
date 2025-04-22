import { View } from "react-native";
import Button from "./Button";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { useEffect } from "react";

//firebase
import { ref, onValue } from "firebase/database";
import { database } from "../constants/firebase";

import useStore from "../store/store";
import useApStore from "@/store/apmodestore";
import useLoading from "@/store/loadingstore";
import OtherCard from "./loading/OtherCard";
import useInternetStatus from "@/constants/Internet";

const Buttons = () => {
  const router = useRouter();

  const { powerStatus, status } = useStore();
  const { kitchen, living, office, setRoomData } = useApStore();
  const { loading } = useLoading();

  const online = useInternetStatus();

  //getting the online if online is true then get from firebase otherwise take it from data.js i mean the store.

  useEffect(() => {
    if (loading || !status) return;

    const roomsRef = ref(database, "rooms");
    const unsubscribe = onValue(roomsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const {
          kitchen: kitchenData,
          office: officeData,
          living: livingData,
        } = data;
        setRoomData("kitchen", {
          roomName: kitchenData.name,
          current: kitchenData.kitchencurrent,
          power: kitchenData.power,
          status: kitchenData.status,
          voltage: 0,
        });
        setRoomData("office", {
          roomName: officeData.name,
          current: officeData.kitchencurrent,
          power: officeData.power,
          status: officeData.status,
          voltage: 0,
        });
        setRoomData("living", {
          roomName: livingData.name,
          current: livingData.kitchencurrent,
          power: livingData.power,
          status: livingData.status,
          voltage: 0,
        });
      }
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, [status, loading, setRoomData]); //onupdation of status or on first load call it.

  return (
    <View style={{ marginTop: 20, flexDirection: "column", gap: 10 }}>
      {loading ? (
        <>
          <OtherCard />
          <OtherCard />
          <OtherCard />
        </>
      ) : online == null ? (
        <>
          <OtherCard />
          <OtherCard />
          <OtherCard />
        </>
      ) : online ? (
        <>
          <Button
            IconComponent={() => <Feather name="tv" size={18} color="gray" />}
            roomName={living.roomName}
            roomPower={living.power}
            status={powerStatus ? living.status : 0}
            onPress={() => {
              router.push("/living");
            }} // Navigate to the living room screen
          />
          <Button
            IconComponent={() => (
              <FontAwesome name="cutlery" size={18} color="gray" />
            )}
            roomName={kitchen.roomName}
            status={powerStatus ? kitchen.status : 0}
            roomPower={kitchen.power}
            onPress={() => {
              router.push("/kitchen");
            }}
          />
          <Button
            IconComponent={() => (
              <FontAwesome name="suitcase" size={18} color="gray" />
            )}
            roomName={office.roomName}
            status={powerStatus ? office.status : 0}
            roomPower={office.power}
            onPress={() => {
              router.push("/office");
            }}
          />
        </>
      ) : (
        <>
          <Button
            IconComponent={() => <Feather name="tv" size={18} color="gray" />}
            roomName={living.roomName}
            roomPower={living.power}
            status={powerStatus ? living.status : 0}
            onPress={() => {}} // Navigate to the living room screen
          />
          <Button
            IconComponent={() => (
              <FontAwesome name="cutlery" size={18} color="gray" />
            )}
            roomName={kitchen.roomName}
            status={powerStatus ? kitchen.status : 0}
            roomPower={kitchen.power}
            onPress={() => {}}
          />
          <Button
            IconComponent={() => (
              <FontAwesome name="suitcase" size={18} color="gray" />
            )}
            roomName={office.roomName}
            status={powerStatus ? office.status : 0}
            roomPower={office.power}
            onPress={() => {}}
          />
        </>
      )}
    </View>
  );
};

export default Buttons;
