// useInternetStatus.ts
import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

const useInternetStatus = (): boolean => {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? false);
    });

    // Fetch initial connection status
    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected ?? false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return isConnected;
};

export default useInternetStatus;
