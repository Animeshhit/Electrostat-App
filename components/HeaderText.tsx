import {
  Text,
  useColorScheme,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import Colors from "../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import UtilsStyles from "../constants/utlis";
import { useRouter } from "expo-router";
import useInternetStatus from "@/constants/Internet";
import useStore from "@/store/store";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { database } from "@/constants/firebase";
import sendLocalNotification from "@/constants/notification";

const HeaderText = ({ text }: { text: string }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const { status } = useStore();

  const online = useInternetStatus();

  const router = useRouter();

  const [message, setMessage] = useState<string | null>("");

  useEffect(() => {
    if (online == null) return;
    if (online && status) {
      const dashboardRef = ref(database, "/");

      const unsubscribe = onValue(dashboardRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          if (data?.alertMessage.length > 0) {
            setMessage(data.alertMessage);
          } else {
            setMessage(null);
          }
        } else {
          setMessage(null);
        }
      });
      return () => unsubscribe();
    }
  }, [status, online]);

  useEffect(() => {
    if (message && message.length > 0) {
      sendLocalNotification("Fault detected", message);
    }
  }, [message]);

  return (
    <View>
      {online && status && message ? (
        <View>
          {
            <Text
              style={{
                backgroundColor: "red",
                textAlign: "center",
                paddingVertical: 2,
                color: "white",
                fontSize: 12,
                borderRadius: 20,
              }}
            >
              {message}
            </Text>
          }
        </View>
      ) : null}

      <View
        style={[
          UtilsStyles.flex,
          UtilsStyles.alignItemsCenter,
          UtilsStyles.justifyContentSapceBetween,
        ]}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 25,
            paddingVertical: 25,
            color: theme.text,
          }}
        >
          {text}
        </Text>
        {online && (
          <Pressable onPress={() => router.push("/notification")}>
            <Ionicons name="notifications" size={24} color={theme.text} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
  },
});

export default HeaderText;
