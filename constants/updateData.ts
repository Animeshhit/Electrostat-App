// updateData.ts
import { Status } from "@/types/type";
import { Database, ref, get, DataSnapshot } from "firebase/database";
import data from "../data";
import useApStore from "../store/apmodestore";
import useStore from "../store/store";
import NetInfo from "@react-native-community/netinfo";
import useApString from "@/store/useApmode";
import { Alert } from "react-native";

const fetchData = async () => {
  const { setRoomData, setDashboardData } = useApStore.getState();
  const { togglePower } = useStore.getState();
  const { url } = useApString.getState();

  const defaultData = {
    dashboard: data.dashboard,
    kitchen: data.kitchen,
    living: data.living,
    office: data.office,
  };

  try {
    if (url) {
      const response = await fetch(url);
      const result = await response.json();

      if (response.ok) {
        setDashboardData(result.dashboard);
        setRoomData("kitchen", result.kitchen);
        setRoomData("living", result.living);
        setRoomData("office", result.office);
        togglePower(1);
      } else {
        Alert.alert("ipconfig has some error");
        setDashboardData(defaultData.dashboard);
        setRoomData("kitchen", defaultData.kitchen);
        setRoomData("living", defaultData.living);
        setRoomData("office", defaultData.office);
        togglePower(0);
      }
    } else {
      setDashboardData(defaultData.dashboard);
      setRoomData("kitchen", defaultData.kitchen);
      setRoomData("living", defaultData.living);
      setRoomData("office", defaultData.office);
      togglePower(0);
    }
  } catch (error) {
    setDashboardData(defaultData.dashboard);
    setRoomData("kitchen", defaultData.kitchen);
    setRoomData("living", defaultData.living);
    setRoomData("office", defaultData.office);
    togglePower(0);
  }
};

const fetchDataWithTimeout = async (ref: any, timeout = 5000) => {
  return Promise.race([
    get(ref),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Network timeout")), timeout)
    ),
  ]);
};

const handlePress = async (
  setLoading: (value: boolean) => void,
  database: Database,
  setStatus: (value: Status) => void
) => {
  setLoading(true);

  const { isConnected } = await NetInfo.fetch();

  if (!isConnected) {
    setStatus(0);
    fetchData();
    setLoading(false);
    return;
  }

  try {
    const dashboardRef = ref(database, "dashboard");
    const snapshot = await fetchDataWithTimeout(dashboardRef);
    const data = (snapshot as DataSnapshot).val();

    if (data?.online) {
      setStatus(1);
    } else {
      setStatus(0);
      fetchData();
    }
    setLoading(false);
  } catch (error) {
    console.log("Error fetching dashboard data:", error);
    setStatus(0);
    fetchData();
    setLoading(false);
  }
};

export default handlePress;
export { fetchData };
