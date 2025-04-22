import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme, ScrollView, Alert } from "react-native";
import { ref, onValue, update, get } from "firebase/database";

import Colors from "../constants/Colors";
import UtilsStyles from "../constants/utlis";
import { database } from "../constants/firebase";
import useStore from "../store/store";
import HeaderText from "../components/HeaderText";
import MainCard from "../components/MainCard";
import Buttons from "../components/Buttons";
import FaultCard from "../components/FaultCard";
import useApStore from "@/store/apmodestore";
import useLoading from "@/store/loadingstore";
import { Status } from "@/types/type";
import MainCardLoader from "@/components/loading/MainCardLoaindg";
import OtherCard from "@/components/loading/OtherCard";
import handlePress, { fetchData } from "@/constants/updateData";
import NetInfo from "@react-native-community/netinfo";
import useInternetStatus from "@/constants/Internet";
import useApString from "@/store/useApmode";

export default function WelcomeScreen() {
  //for color schema
  const colorScheme = useColorScheme();
  const themeColor = Colors[colorScheme ?? "light"];
  //firebase
  const isFirstRun = useRef(true);

  const [customIp, setCustomIp] = useState<string>("");

  const {
    setStatus,
    togglePower,
    status,
    powerStatus,
    underVoltage,
    surge,
    earthFault,
    setEarthFault,
    setUnderVoltage,
    setSurge,
  } = useStore();

  const { setDashboardData, dashboard } = useApStore();
  const { loading, setLoading } = useLoading();
  const { url, setUrl } = useApString();
  const online = useInternetStatus();

  // Helper function to update room statuses
  const updateRoomStatus = async (status: Status) => {
    try {
      await update(ref(database, "rooms"), { powerStatus: status });
      if (status == 0) {
        await Promise.all([
          update(ref(database, "rooms/office"), { status: 0 }),
          update(ref(database, "rooms/living"), { status: 0 }),
          update(ref(database, "rooms/kitchen"), { status: 0 }),
        ]);
      }
    } catch (error) {
      console.error("Failed to update room statuses:", error);
    }
  };

  // Initial fetch of dashboard status
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      if (!online) {
        // Client is offline
        setStatus(0);
        fetchData();
        setLoading(false);
      } else {
        // Client is online
        try {
          const dashboardRef = ref(database, "dashboard");
          const snapshot = await get(dashboardRef);
          const data = snapshot.val();

          if (data?.online) {
            setStatus(1);
          } else {
            setStatus(0);
            fetchData();
          }
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
          setStatus(0);
          fetchData();
        } finally {
          setLoading(false);
        }
      }
    };

    initializeData();
  }, [online]);

  // Fetch dashboard data if online
  useEffect(() => {
    if (loading || !status) return;

    const dashboardRef = ref(database, "dashboard");

    const unsubscribe = onValue(dashboardRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.online) {
        setDashboardData({
          voltage: data.currentVoltage || 0.0,
          totalPowerConsumption: data.powerConsumption || 0.0,
        });
      }
    });

    return () => unsubscribe();
  }, [loading, status]);

  // Fetch power status
  useEffect(() => {
    if (loading || !status) return;

    const roomsRef = ref(database, "rooms");

    const unsubscribe = onValue(roomsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        togglePower(data.powerStatus);
      }
    });

    return () => unsubscribe();
  }, [loading, status]);

  // Update room power status on change
  useEffect(() => {
    if (!status) return;

    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    updateRoomStatus(powerStatus);
  }, [powerStatus, status]);

  // Fetch protection data
  useEffect(() => {
    if (!status) return;

    const protectionRef = ref(database, "protection");

    const unsubscribe = onValue(protectionRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setEarthFault(data.earthfault);
        setSurge(data.surge);
        setUnderVoltage(data.underVoltage);
      }
    });

    return () => unsubscribe();
  }, [status]);

  // Turn off power on fault
  useEffect(() => {
    if (!status) return;
    if (earthFault === 1 || surge === 1 || underVoltage === 1) {
      updateRoomStatus(0);
    }
  }, [earthFault, surge, underVoltage, status]);

  const handlePressclick = () => {
    handlePress(setLoading, database, setStatus);
  };

  const [isVisiable, setIsVisiable] = useState<boolean>(false);
  const [modelLoading, setModelLoading] = useState<boolean>(false);

  const handleIpconfig = () => {
    setUrl(customIp);
    setModelLoading(true);
    setTimeout(() => {
      fetchData()
        .then(() => {
          setModelLoading(false);
          setIsVisiable(false);
        })
        .catch((err) => {
          setModelLoading(false);
          setIsVisiable(false);
        });
    }, 2000);
  };

  return (
    <SafeAreaView
      style={[
        UtilsStyles.container,
        { backgroundColor: themeColor.background },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <HeaderText text="Dashboard" />
        {loading ? (
          <>
            <MainCardLoader />
            <OtherCard />
            <OtherCard />
          </>
        ) : (
          <>
            <MainCard
              mainSwitch={powerStatus}
              setMainSwitch={togglePower}
              voltage={dashboard.voltage}
              powerConsumption={dashboard.totalPowerConsumption}
              wifiMode={status}
              handlePress={handlePressclick}
              value={customIp}
              setValue={setCustomIp}
              handleIpconfig={handleIpconfig}
              visiable={isVisiable}
              modelLoading={modelLoading}
              setVisiable={setIsVisiable}
            />
            <Buttons />
            <FaultCard faultName="Earth Fault" fault={earthFault} />
            <FaultCard faultName="Over Current" fault={0} />
            <FaultCard faultName="Under Voltage" fault={underVoltage} />
            <FaultCard faultName="Surge" fault={surge} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export const screenOptions = {
  headerShown: false,
};
